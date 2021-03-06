// @flow

import React from "react";
import { Trans } from "react-i18next";
import type { Transaction } from "@ledgerhq/live-common/lib/families/bitcoin/types";
import type { Account, TransactionStatus } from "@ledgerhq/live-common/lib/types";
import { getAccountBridge } from "@ledgerhq/live-common/lib/bridge";
import Box from "~/renderer/components/Box";
import Text from "~/renderer/components/Text";
import Switch from "~/renderer/components/Switch";

type Props = {
  account: Account,
  transaction: Transaction,
  onChange: Transaction => void,
  status: TransactionStatus,
};

export const PickUnconfirmedRBF = ({ transaction, account, onChange, status }: Props) => {
  const bridge = getAccountBridge(account);
  return (
    <Box flow={2} horizontal alignItems="center">
      <Switch
        isChecked={transaction.utxoStrategy.pickUnconfirmedRBF}
        onChange={pickUnconfirmedRBF =>
          onChange(
            bridge.updateTransaction(transaction, {
              utxoStrategy: { ...transaction.utxoStrategy, pickUnconfirmedRBF },
            }),
          )
        }
      />
      <Text color="palette.text.shade50" ff="Inter|Medium" fontSize={12}>
        <Trans i18nKey="bitcoin.pickUnconfirmedRBF" />
      </Text>
    </Box>
  );
};
