import { LoggedInUser } from '../../../lib/custom_typings/LoggedInUser';
import { AccountWithHost } from '../../../lib/graphql/types/v2/graphql';
import { getPolicy } from '../../../lib/policies';

export const userMustSetAccountingCategory = (
  user: LoggedInUser | null,
  collective: AccountWithHost | null,
  host = collective?.host,
) => {
  const policy = getPolicy<'EXPENSE_CATEGORIZATION'>(host, 'EXPENSE_CATEGORIZATION');
  if (policy) {
    if (policy.requiredForExpenseSubmitters) {
      return true;
    } else if (policy.requiredForCollectiveAdmins) {
      return user?.isAdminOfCollectiveOrHost(collective);
    }
  }

  return false;
};

export const collectiveAdminsMustConfirmAccountingCategory = (collective: AccountWithHost): boolean => {
  const policy = getPolicy<'EXPENSE_CATEGORIZATION'>(collective?.host, 'EXPENSE_CATEGORIZATION');
  return Boolean(policy?.requiredForCollectiveAdmins);
};
