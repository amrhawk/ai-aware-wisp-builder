"""TaxInject-Sim: policy-level Monte Carlo of sink policies for tax agents.

A STYLIZED MODEL of the sink-policy layer (who is asked to endorse what, and what
an outside attacker who forges a critical value achieves). It runs NO language model.
All parameters are stated assumptions (PARAMS), varied in sensitivity runs.

Critical values (S_crit) and the channels that can corroborate them:
  bank   refund / balance-due account : prior-year return (if unchanged) or out-of-band (OOB) client confirmation
  addr   mailing address              : prior-year return (if unchanged) or OOB
  dep    each dependent               : prior-year return (if unchanged) or OOB
  recip  third-party recipient        : firm records (if known) or OOB
Issuer transcripts corroborate only return VALUES (S_val), not critical values.
Threat model: an OUTSIDE attacker for S_crit (the client is honest, so client-side channels
are trusted unless compromised, prob. rho); an adversarial client is modelled for S_val only.
"""
import json
import numpy as np

PARAMS = dict(
    n_clients=200, reps=200,
    p_returning=0.85, p_same=0.85, p_dep_same=0.90, p_recipient=0.20, p_recipient_known=0.70,
    q_oob=0.60, s=0.70,
    eps0=0.05, phi=0.01, delta=0.10, rho=0.02,
    f_issuer=0.80, c_flag=0.95, r0=0.20,
)
WORKFLOWS = {
    "prepare_1040": ["bank", "addr", "dep", "recip"],
    "mid_season":   ["bank", "addr"],
    "client_q":     ["recip"],
    "request_docs": ["recip"],
    "amend":        ["bank", "dep"],
}
DELIVERIES = 5  # visible, hidden text, metadata, OCR-only, parser-differential (policy-equivalent under A1)

def draw_client(rng, P):
    ret = rng.random() < P["p_returning"]
    return dict(ret=ret, bank_same=ret and rng.random() < P["p_same"],
                addr_same=ret and rng.random() < P["p_same"],
                ndep=int(rng.choice([0, 0, 1, 2, 3])), dep_same=ret and rng.random() < P["p_dep_same"],
                recip=rng.random() < P["p_recipient"], recip_known=ret and rng.random() < P["p_recipient_known"])

def values(c, wf):
    """list of critical values in the task: (category, corroborable_by_prior)"""
    v = []
    for cat in WORKFLOWS[wf]:
        if cat == "bank": v.append(("bank", c["bank_same"]))
        elif cat == "addr": v.append(("addr", c["addr_same"]))
        elif cat == "dep": v += [("dep", c["dep_same"])] * c["ndep"]
        elif cat == "recip" and c["recip"]: v.append(("recip", c["recip_known"]))
    return v

def attest_flags(c, vals, rng, P, use_prior=True, use_oob=True):
    """True = value needs a human prompt under ATTEST"""
    out = []
    for cat, prior_ok in vals:
        ok = (use_prior and prior_ok) or (use_oob and c["ret"] and rng.random() < P["q_oob"])
        out.append(not ok)
    return out

def eps(P, n, persuasive):
    return min(1.0, P["eps0"] + P["phi"] * max(0, n - 1) + (P["delta"] if persuasive else 0.0))

def sval_success(P, s):
    caught = P["f_issuer"] * s * P["c_flag"] + (1 - P["f_issuer"] * s) * P["r0"]
    return 1 - caught

def run(P, seed=0, attacks=True, use_prior=True, use_oob=True, llm_prompt=False):
    rng = np.random.default_rng(seed)
    S = ["confirm_all", "camel_fides", "attest"]
    out = {k: dict(prompts=[], auto=[], pr_att=[], asr0=[], asr1=[], n_att=[]) for k in S}
    for _ in range(P["reps"]):
        a = {k: dict(pr=0, auto=0, tasks=0, pa=0, hit0=0, hit1=0, att=0) for k in S}
        for _c in range(P["n_clients"]):
            c = draw_client(rng, P)
            for wf in WORKFLOWS:
                vals = values(c, wf); fl = attest_flags(c, vals, rng, P, use_prior, use_oob)
                n_cam = len(vals); n_all = n_cam + 2; n_att = sum(fl)
                for k, n in (("confirm_all", n_all), ("camel_fides", n_cam), ("attest", n_att)):
                    a[k]["pr"] += n; a[k]["auto"] += (n == 0); a[k]["tasks"] += 1
                if not attacks: continue
                for g in sorted({cat for cat, _ in vals}):
                    idx = [i for i, (cat, _) in enumerate(vals) if cat == g]
                    for _d in range(DELIVERIES):
                        i = idx[int(rng.integers(len(idx)))]
                        n_t = n_att + (0 if fl[i] else 1)   # forged value must now be endorsed
                        u = rng.random(); w = rng.random()
                        A = a["attest"]; A["att"] += 1; A["pa"] += n_t - n_att
                        hit = (w < P["rho"]) or (u < eps(P, n_t, llm_prompt))
                        A["hit0"] += hit; A["hit1"] += hit
                        C = a["camel_fides"]; C["att"] += 1; C["pa"] += 0
                        C["hit0"] += (u < eps(P, n_cam, False)); C["hit1"] += (u < eps(P, n_cam, True))
                        F = a["confirm_all"]; F["att"] += 1; F["pa"] += 0
                        F["hit0"] += (u < eps(P, n_all, False)); F["hit1"] += (u < eps(P, n_all, False))
        for k in S:
            x = a[k]; o = out[k]
            o["prompts"].append(x["pr"] / x["tasks"]); o["auto"].append(x["auto"] / x["tasks"])
            if attacks and x["att"]:
                o["pr_att"].append(x["pa"] / x["att"]); o["asr0"].append(x["hit0"] / x["att"])
                o["asr1"].append(x["hit1"] / x["att"]); o["n_att"].append(x["att"])
    return out

def summ(x):
    x = np.array(x, float)
    return (float(x.mean()), float(x.std(ddof=1))) if len(x) > 1 else (float(x.mean()) if len(x) else float("nan"), 0.0)

def table(o):
    return {k: {m: summ(v[m]) for m in ("prompts", "auto", "pr_att", "asr0", "asr1", "n_att")} for k, v in o.items()}

if __name__ == "__main__":
    P = dict(PARAMS); R = {"params": P, "n_tasks": P["n_clients"] * len(WORKFLOWS)}
    R["base"] = table(run(P, seed=1))
    nf = run(dict(P, phi=0.0, delta=0.0), seed=2); R["no_fatigue_no_persuasion"] = {k: summ(v["asr0"]) for k, v in nf.items()}
    R["sval"] = {str(s): sval_success(P, s) for s in (0.0, 0.5, 0.7, 1.0)}
    xs = [i / 10 for i in range(11)]; curve = {"p_returning": xs}
    for k in ("confirm_all", "camel_fides", "attest"): curve[k] = []
    for p in xs:
        o = run(dict(P, p_returning=p), seed=3, attacks=False)
        for k in ("confirm_all", "camel_fides", "attest"): curve[k].append(summ(o[k]["prompts"]))
    R["curve"] = curve
    ab = {"ATTEST (full)": run(P, seed=1)["attest"],
          "No prior-year or firm-record corroboration": run(P, seed=4, use_prior=False)["attest"],
          "No out-of-band confirmation": run(P, seed=5, use_oob=False)["attest"],
          "Neither prior-year nor out-of-band": run(P, seed=6, use_prior=False, use_oob=False)["attest"],
          "Model-written endorsement prompts": run(P, seed=7, llm_prompt=True)["attest"]}
    R["ablations"] = {k: {m: summ(v[m]) for m in ("prompts", "auto", "pr_att", "asr0")} for k, v in ab.items()}
    sens = []
    for rho in (0.0, 0.02, 0.05):
        for q in (0.3, 0.6, 0.9):
            r = run(dict(P, rho=rho, q_oob=q), seed=8)["attest"]
            sens.append(dict(rho=rho, q_oob=q, prompts=summ(r["prompts"])[0], asr=summ(r["asr0"])[0]))
    R["sens"] = sens
    json.dump(R, open("results.json", "w"), indent=1)
    print("done")
