import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Modal,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { AllCartProds } from "components/allTypes/dto/CartDTO";
import { NewOrderResponse } from "components/allTypes/dto/newOrder.dto";
import { SubSku } from "components/allTypes/productType";
import { appColors, appStyles } from "components/common/appColors";
import { BlackButton, YellowButton } from "components/common/styled/buttons";
import { muiSxPropType } from "components/common/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as styles from "./style";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  CreateReviewRequest,
  ReviewImageData,
  UploadReviewImagesResponse,
} from "components/allTypes/reviewType";
import appConfig from "config";
import { useRecoilValue } from "recoil";
import { currentProductIdAtom } from "atoms/atoms";

export const ProductOutOfStockModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.outOfStock}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Typography sx={{ color: "red" }} id="modal-modal-title" variant="h6" component="h2">
            Sold out ☹️
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Sorry, this option is sold out. Please Select another option
        </Typography>
      </Box>
    </Modal>
  );
};

export const NegativeInventoryModal = ({
  open,
  handleClose,
  handleConfirm,
}: {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" PaperProps={{ sx: { m: 1 } }}>
      <DialogContent sx={{ pb: 0 }}>
        <DialogContentText
          color="inherit"
          component="div"
          sx={styles.negativeInventoryModalContent}
        >
          <img
            src="/images/important-notice.jpg"
            alt="Important Notice before Adding product to cart"
            width="50%"
          />
          <Typography component={"div"}>
            <Typography>Dear Customer,</Typography>
            <Typography component={"ul"}>
              <Typography component={"li"}>
                This product can be delivered in <span className="red-text">15 to 17 days</span>.
              </Typography>
              <Typography component={"li"}>
                If you refuse the order at the time of delivery we will have a{" "}
                <span className="red-text">LOSS</span>.
              </Typography>
            </Typography>
            <Typography textAlign={"center"} fontStyle={"italic"}>
              Good things are worth waiting for <span className="smily">☺</span>
            </Typography>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: { sm: 2 }, justifyContent: "space-evenly" }}>
        <BlackButton variant="contained" onClick={handleClose} sx={{ fontWeight: appStyles.w600 }}>
          NO cannot wait
        </BlackButton>
        <YellowButton
          variant="contained"
          onClick={handleConfirm}
          autoFocus
          sx={{ fontWeight: appStyles.w600 }}
        >
          YES i can wait
        </YellowButton>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmOrderModal = ({
  open,
  handleAddMore,
  handleConfirmOrder,
  newOrderMutation,
}: {
  newOrderMutation: UseMutationResult<
    AxiosResponse<NewOrderResponse, any>,
    unknown,
    {
      cartProducts: AllCartProds;
      selectedSubSku: SubSku | null;
    },
    unknown
  >;
  open: boolean;
  handleConfirmOrder: () => void;
  handleAddMore: () => void;
}) => {
  return (
    <Modal
      open={open}
      // onClose={handleOrderModalClose}
      aria-labelledby="confirm-order-modal"
      aria-describedby="checkout-the-delivary-or-add-more"
      disableAutoFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={styles.orderModalStyle}>
        <Box sx={styles.orderModalCheckBox}>
          <CheckIcon fontSize="large" />
        </Box>
        <Typography variant="subtitle2" fontWeight="700" sx={styles.orderModalHeader}>
          Your Order Processed Succesfully
        </Typography>
        <Box sx={styles.orderModalActions}>
          <Grid container direction="row" justifyContent="center">
            <Grid item>
              <Typography fontWeight={appStyles.w600} fontSize={13}>
                Add more to your order with no&nbsp;
                <span style={{ color: "red", textAlign: "center" }}>
                  EXTRA delivery charge&nbsp;
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <LocalShippingIcon fontSize="small" htmlColor="SaddleBrown" />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction="column" py={3}>
            <Grid item>
              <BlackButton
                disableElevation
                variant="contained"
                sx={styles.orderModalActionsButton}
                onClick={handleConfirmOrder}
                startIcon={
                  newOrderMutation.isLoading && <CircularProgress size={16} color="inherit" />
                }
                disabled={newOrderMutation.isLoading}
              >
                Confirm Order
              </BlackButton>
            </Grid>
            <Grid item>
              <YellowButton
                disableElevation
                variant="contained"
                sx={styles.orderModalActionsButton}
                onClick={handleAddMore}
              >
                Add More Deals
              </YellowButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

interface CreateReviewValues {
  name: string;
  message: string;
  rating: number;
  files?: FileList;
}
export const AddReviewModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const productId = useRecoilValue(currentProductIdAtom) as string; // because id will be set on [id].tsx
  const [images, setImages] = useState<string[]>([]); // base64 image string[] type
  const prodImgWidth = 64;
  const style: muiSxPropType = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 700,
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    "& .MuiFilledInput-root": {
      ":before": {
        borderBottom: "none",
      },
      borderRadius: appStyles.textFieldShape,
    },
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSelectFiles = () => {
    fileInputRef.current!.click();
  };

  const createReviewMutation = useMutation({
    mutationFn: async (newReview: {
      name: string;
      message: string;
      rating: number;
      images: ReviewImageData[];
    }) => {
      const body: CreateReviewRequest = {
        models: {
          parent_id: productId,
          location_id: appConfig.api.locationId,
          location_name: appConfig.api.location_name,
          posted_user: newReview.name,
          product_rating: newReview.rating,
          product_review: newReview.message,
          review_images: newReview.images,
        },
      };
      return axios.post("/api/store/product/review/create", body);
    },
    // onSuccess used in .mutate() method
  });

  const uploadImagesMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("files", file);
      const { data } = await axios.post("/api/store/product/review/s3/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data as UploadReviewImagesResponse;
    },
  });

  const validationSchema = yup.object({
    name: yup.string().required("Full Name is required"),
    message: yup.string().required("Description is required"),
    rating: yup.number().min(1, "Review is required"),
    files: yup.mixed().test("files-count", "Can't upload more than 3 images", (values) => {
      if (values && values.length > 3) {
        return false;
      } else return true;
    }),
  });

  const formik = useFormik<CreateReviewValues>({
    initialValues: {
      name: "",
      message: "",
      rating: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { name, message, rating, files } = values;
      await new Promise(async (resolve, reject) => {
        // todo this should be array. and will push values afer uploading each image
        let uploadedData: ReviewImageData[] = [];
        if (files) {
          const filesList = Array.from(files);
          for (const file of filesList) {
            const { data } = await uploadImagesMutation.mutateAsync(file);
            uploadedData.push(data);
          }
        }
        createReviewMutation.mutate(
          {
            name,
            message,
            rating,
            images: uploadedData ? uploadedData : [],
          },
          {
            onSuccess(data, variables, context) {
              resolve(data);
              queryClient.refetchQueries({
                queryKey: [appConfig.queryKeys.productReviews, productId],
              });
              resetForm();
              handleClose();
            },
          }
        );
      });
    },
  });

  useEffect(() => {
    // https://blog.logrocket.com/using-filereader-api-preview-images-react/
    const imageUrls: string[] = [],
      fileReaders: FileReader[] = [];
    let isCancel = false;
    if (formik.values.files && formik.values.files.length) {
      const imageFiles = Array.from(formik.values.files);
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target as any;
          if (result) {
            imageUrls.push(result);
          }
          if (imageUrls.length === imageFiles.length && !isCancel) {
            setImages(imageUrls);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [formik.values.files]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Stack spacing={1}>
                <Typography variant="h6">Full Name</Typography>
                <TextField
                  id="name"
                  name="name"
                  variant="filled"
                  hiddenLabel
                  placeholder="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Stack>
              <Stack spacing={1} alignItems="center">
                <Typography variant="h6">Rate your overall experience</Typography>
                <Rating
                  id="rating"
                  name="rating"
                  size="large"
                  value={formik.values.rating}
                  onChange={(event, value) => {
                    formik.setFieldValue("rating", value);
                  }}
                />
                <Typography variant="body2" color={"red"}>
                  {formik.touched.rating && formik.errors.rating}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h6">Write Review</Typography>
              <TextField
                id="message"
                name="message"
                variant="filled"
                hiddenLabel
                placeholder="Write you review here..."
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Stack>
            <Stack direction={"row"} alignItems="end" justifyContent={"space-between"}>
              <Stack spacing={1}>
                <Typography variant="h6">Upload Image</Typography>
                <Stack direction={"row"} spacing={2}>
                  <Box sx={{ border: `1px dashed ${appColors.lightGrey}` }}>
                    <IconButton
                      onClick={handleSelectFiles}
                      disableTouchRipple
                      sx={{
                        height: `${prodImgWidth}px`,
                        width: `${prodImgWidth}px`,
                        borderRadius: 0,
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <input
                      type="file"
                      name="files"
                      id="files"
                      multiple
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files?.length < 4) {
                          formik.setFieldValue("files", e.target.files);
                        } else
                          formik.setErrors({
                            files: "Can't select more than 3 images",
                          });
                      }}
                    />
                  </Box>

                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="product review captures"
                      width={prodImgWidth}
                      height={prodImgWidth}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ))}
                  {/* <Image
                      src={"/temp/prod_img.jpg"}
                    alt="product review captures"
                    width={prodImgWidth}
                    height={prodImgWidth}
                  /> */}
                </Stack>
                <Typography variant="caption" color={"red"}>
                  {formik.errors.files}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <BlackButton variant="contained" disableElevation onClick={handleClose}>
                  Cancel Review
                </BlackButton>
                <YellowButton
                  variant="contained"
                  type="submit"
                  disableElevation
                  disabled={formik.isSubmitting}
                  startIcon={formik.isSubmitting && <CircularProgress color="inherit" size={20} />}
                >
                  Submit Review
                </YellowButton>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
};
