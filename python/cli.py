#!/usr/bin/env python3
"""
AI Automation ROI Estimator — CLI
Swift Tech Co. — https://swifttechco.com

Usage:
    python cli.py
    python cli.py --process "Data entry & processing" --team "5 to 15 people" \
                  --hours 40 --rate 35
"""

import argparse
from calculator import PROCESSES, TEAM_SIZES, calculate


def interactive():
    print("\nAI Automation ROI Estimator")
    print("Swift Tech Co. — https://swifttechco.com")
    print("=" * 48)

    processes = list(PROCESSES.keys())
    print("\nProcess to automate:")
    for i, p in enumerate(processes, 1):
        print(f"  {i}. {p}")
    idx = int(input(f"Select (1-{len(processes)}): ")) - 1
    process = processes[idx]

    sizes = list(TEAM_SIZES.keys())
    print("\nTeam size handling this process:")
    for i, s in enumerate(sizes, 1):
        print(f"  {i}. {s}")
    idx = int(input(f"Select (1-{len(sizes)}): ")) - 1
    team_size = sizes[idx]

    hours = float(input("\nTotal team hours spent per week on this process: "))
    rate = float(input("Average hourly cost per team member (USD): "))

    result = calculate(process, team_size, hours, rate)

    print("\n" + "=" * 48)
    print("ROI Projection")
    print(f"  Annual savings:        ${result['annual_savings']:,}")
    print(f"  Implementation cost:   ${result['impl_cost']:,}")
    print(f"  Payback period:        {result['payback_months']} months")
    print(f"  5-year ROI:            {result['roi_5yr_pct']}%")
    print(f"  Automation rate:       {result['auto_rate_pct']}%")
    print(f"  Hours saved per week:  {result['hours_saved_per_week']}")
    print("\nGet a detailed automation plan: https://swifttechco.com/contact")


def main():
    parser = argparse.ArgumentParser(description="AI Automation ROI Estimator")
    parser.add_argument("--process", choices=list(PROCESSES.keys()))
    parser.add_argument("--team", choices=list(TEAM_SIZES.keys()))
    parser.add_argument("--hours", type=float)
    parser.add_argument("--rate", type=float)
    args = parser.parse_args()

    if not all([args.process, args.team, args.hours, args.rate]):
        interactive()
        return

    result = calculate(args.process, args.team, args.hours, args.rate)
    print(f"Annual savings: ${result['annual_savings']:,} | Payback: {result['payback_months']}mo | 5yr ROI: {result['roi_5yr_pct']}%")


if __name__ == "__main__":
    main()
