export interface IFindingCost {
  code: number;
  msg: {
    total_finding_cost: number,
    total_finding_labor_cost: number
  };
}
