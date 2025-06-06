import { ChangeEvent, FC, useMemo } from 'react';

// Base components.
import { Box, EditableText, Typography } from '@/components/base';

// Hooks.
import { useGenerator } from '@/hooks/useGenerator';
import { useInvoice } from '@/hooks';

// Utilities.
import { formatRupiah } from '@/utils/currency';

// Styles.
const rowStyles = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: '#ffffff',
};
const colStyles = {
  position: 'relative',
  display: 'flex',
};

interface Props {
  subTotal: number;
  taxRate?: number;
  saleTax?: number;
}

const InvoiceSummary: FC<Props> = ({ subTotal, taxRate, saleTax }) => {
  const { editable } = useGenerator();
  const { updateTaxRate } = useInvoice();

  const total = useMemo(() => {
    return typeof subTotal !== 'undefined' && typeof saleTax !== 'undefined' ? subTotal + saleTax : 0;
  }, [subTotal, saleTax]);

  const onChangeTaxRate = (e: ChangeEvent<HTMLInputElement>): void => {
    updateTaxRate(Number(e.target.value));
  };

  return (
    <Box>
      {/* Subtotal */}
      <Box
        style={{
          ...rowStyles,
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          padding: editable ? '10px 16px' : '8px 16px',
          borderBottom: '1px solid #F6F9FC',
        }}
      >
        <Box style={{ width: '62%', ...colStyles }}>
          <Typography style={{ fontWeight: 600 }}>{'Sub Total'}</Typography>
        </Box>
        <Box style={{ width: '38%', ...colStyles }}>
          <Typography style={{ fontWeight: 600 }}>{formatRupiah(subTotal)}</Typography>
        </Box>
      </Box>

      {/* Tax */}
      <Box
        style={{
          ...rowStyles,
          padding: editable ? '10px 16px' : '8px 16px',
        }}
      >
        <Box style={{ width: '62%', ...colStyles }}>
          <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography style={{ fontWeight: 600 }}>{'Tax '}</Typography>
            <Typography color="secondary">
              {editable ? (
                <>
                  <EditableText
                    type="number"
                    sx={{ color: 'text.secondary', display: 'inline-flex', width: 60, ml: 1 }}
                    name="quantity"
                    value={taxRate}
                    onChange={onChangeTaxRate}
                  />
                  %
                </>
              ) : (
                `(${taxRate}%)`
              )}
            </Typography>
          </Box>
        </Box>
        <Box style={{ width: '38%', ...colStyles }}>
          <Typography style={{ fontWeight: 600 }}>{formatRupiah(saleTax || 0)}</Typography>
        </Box>
      </Box>

      {/* Total */}
      <Box
        style={{
          ...rowStyles,
          padding: editable ? '10px 16px' : '8px 16px',
          backgroundColor: '#EEF6FE',
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 3,
        }}
      >
        <Box style={{ width: '62%', ...colStyles }}>
          <Typography style={{ fontWeight: 600 }}>{'Total'}</Typography>
        </Box>
        <Box style={{ width: '38%', ...colStyles }}>
          <Typography style={{ fontWeight: 600 }}>{formatRupiah(total)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoiceSummary;
