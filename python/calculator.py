"""
AI Automation ROI Estimator
Swift Tech Co. — https://swifttechco.com

Calculates annual savings, payback period, and 5-year ROI for AI process automation
based on process type, team size, hours spent, and hourly cost.
"""

PROCESSES = {
    "Customer support & ticketing":    {"auto_rate": 0.70, "impl_base": 18000},
    "Data entry & processing":         {"auto_rate": 0.85, "impl_base": 12000},
    "Invoice & document handling":     {"auto_rate": 0.80, "impl_base": 20000},
    "Lead qualification & outreach":   {"auto_rate": 0.65, "impl_base": 15000},
    "Report generation & analytics":   {"auto_rate": 0.75, "impl_base": 22000},
    "Content creation & moderation":   {"auto_rate": 0.60, "impl_base": 16000},
    "HR onboarding & offboarding":     {"auto_rate": 0.70, "impl_base": 24000},
    "Inventory & order management":    {"auto_rate": 0.80, "impl_base": 28000},
}

TEAM_SIZES = {
    "1 to 5 people":   1.0,
    "5 to 15 people":  1.55,
    "15 to 50 people": 2.3,
    "50+ people":      3.4,
}


def calculate(process: str, team_size: str, hours_per_week: float, hourly_rate: float) -> dict:
    """
    Returns AI automation ROI projection.

    Args:
        process: One of the PROCESSES keys.
        team_size: One of the TEAM_SIZES keys.
        hours_per_week: Total team hours spent on the process per week.
        hourly_rate: Average hourly cost (USD) for team members doing this work.

    Returns:
        dict with keys: annual_savings, impl_cost, payback_months, roi_5yr_pct,
                        auto_rate_pct, hours_saved_per_week
    """
    if process not in PROCESSES:
        raise ValueError(f"Unknown process: {process}")
    if team_size not in TEAM_SIZES:
        raise ValueError(f"Unknown team size: {team_size}")
    if hours_per_week <= 0:
        raise ValueError("hours_per_week must be greater than 0")
    if hourly_rate <= 0:
        raise ValueError("hourly_rate must be greater than 0")

    p = PROCESSES[process]
    ar = p["auto_rate"]
    annual_savings = round(hours_per_week * ar * 52 * hourly_rate)
    impl_cost = round(p["impl_base"] * TEAM_SIZES[team_size])
    payback_months = max(1, round(impl_cost / annual_savings * 12))
    roi_5yr_pct = round((annual_savings * 5 - impl_cost) / impl_cost * 100)
    hours_saved = round(hours_per_week * ar)

    return {
        "annual_savings":       annual_savings,
        "impl_cost":            impl_cost,
        "payback_months":       payback_months,
        "roi_5yr_pct":          roi_5yr_pct,
        "auto_rate_pct":        round(ar * 100),
        "hours_saved_per_week": hours_saved,
    }
