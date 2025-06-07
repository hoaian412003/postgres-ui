export class PolicyInsufficientError extends Error {
  public needPolicies: string[];

  constructor(needPolicies: string[]) {
    super(JSON.stringify({
      message: 'Insufficient policy',
      needPolicies: needPolicies
    }))
    this.name = "PolicyInsufficientError";
    this.needPolicies = needPolicies;
  }
}
