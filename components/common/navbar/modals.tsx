import { Box, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import { BlackButton, YellowButton } from "../styled/buttons";
import * as yup from "yup";
import { useFormik } from "formik";
import { saveCustomerInfoToStorage } from "../functions";
import { useRecoilState } from "recoil";
import { customerContactInfo } from "atoms/atoms";
import { appStyles } from "../appColors";

interface EditCustomerInfoValues {
  name: string;
  phone: string;
  address: string;
}

export const EditCustomerInfo = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [customerContInfo, setCustomerContInfo] = useRecoilState(customerContactInfo);

  const formikInitialValues: EditCustomerInfoValues = {
    name: customerContInfo!.name,
    phone: customerContInfo!.phone,
    address: customerContInfo!.address,
  };

  const schema = yup.object().shape({
    name: yup.string().min(2, "Enter a valid Name").required("Name is required"),
    phone: yup.string().length(8, "Enter a valid Number").required("Number is required"),
    address: yup.string().min(1).required("Address is required"),
  });

  const formik = useFormik<EditCustomerInfoValues>({
    initialValues: formikInitialValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, submitForm }) => {
      const { name, phone, address } = values;
      if (customerContInfo) {
        saveCustomerInfoToStorage(name, phone, customerContInfo.city, address);
        setCustomerContInfo({ name, phone, city: customerContInfo.city, address });
      }
      handleClose();
    },
  });
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ px: 4, pt: 4 }}>
          <Typography fontWeight={appStyles.w600}>Customer Name:</Typography>
          <TextField
            name="name"
            type="text"
            variant="outlined"
            placeholder="Enter Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="dense"
          />
          <Typography fontWeight={appStyles.w600} sx={{ mt: 1 }}>
            Contact Number:
          </Typography>
          <TextField
            name="phone"
            placeholder="Contact Number"
            variant="outlined"
            type="number"
            fullWidth
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="dense"
          />
          <Typography fontWeight={appStyles.w600} sx={{ mt: 1 }}>
            Customer Address:
          </Typography>
          <TextField
            name="address"
            variant="outlined"
            type="text"
            placeholder="Delivery Address"
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            margin="dense"
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 3, mb: 2 }}>
          <BlackButton
            onClick={handleClose}
            variant="contained"
            sx={{ fontWeight: appStyles.w600, fontSize: 16 }}
          >
            Cancel
          </BlackButton>
          <YellowButton
            variant="contained"
            sx={{ fontWeight: appStyles.w600, fontSize: 16 }}
            type="submit"
          >
            Save
          </YellowButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
