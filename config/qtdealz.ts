import { ConfigsType } from "config";

const qtdealz: ConfigsType = {
  name: "QTDEALZ",
  api: {
    baseUrl: "https://office21.dealizzle.com",
    imgUrl: "https://office21-prod.s3.me-south-1.amazonaws.com/uploads/productImages",
    reviewImgUrl: "https://office21-prod.s3.me-south-1.amazonaws.com/uploads/reviewImages",
    locationId: "6326a80ff1c870c329520055",
    location_name: "www.qtdealz.com",
    favIconFileName: "qtdealz-icon.png",
  },
  contact: {
    whatsapp:
      "https://api.whatsapp.com/send?phone=+97477857469&text=I%20have%20a%20question%20can%20you%20assist%20me%20",
    email: "info@qtdealz.com",
    address:
      "Dee Vinci Trading WLL, Office 14, Building Number 226 street number 230 Zone 25, OPP AL EMADI BUSINESS CENTRE, NAJMA, C RING RD, Doha, Qatar",
    phone: "+974 5030 3100",
  },
  product: {
    currency: "QAR",
    // prettier-ignore
    cities: ["Ain Khaled", "Al Ruwais", "Dukhan", "Lusail", "Mesaleed", "Ras Laffan", "Um Salal Ali", "Al Khor", "Al Rayyan", "Al Wakrah", "Doha"],
    whatsappShare:
      "https://api.whatsapp.com/send?phone=+97477857469&text=I%20just%20bought%20something%20amazing%20from%20this%20QATAR%20based%20website.%20Check%20out%20their%20cool%20products",
    invoiceLink: "https://office21.dealizzle.com/api/store/customer/order/pdf?order_number=",
    vat: false,
    displayYoutubeThumbnail: false,
  },
  featureFlags: {
    whatsappFab: true,
    categorySorting: false,
  },
  customer: {
    rememberContactInfo: true,
    rmContInfoAfterOrder: true,
  },
  queryKeys: {
    categories: "allCategories",
    productReviews: "product-reviews",
  },
  apiRoutes: {
    productInventoryBulkRoute: "/api/store/product/inventory/parent/query/get",
  },
  head: {
    home: {
      title: "Qtdealz - Online Shopping in Qatar for Fashion, Apparel, women shoes | Qtdealz.com",
      description:
        "Discount shopping in Qatar. Free shipping! Cash on Delivery! 24 hours customer service. Buy fashion clothing, women fashion, kid toys, home appliances, shoes, bags, books, etc.",
      keywords: "Qtdealz, Qatar online shopping, women fashion, discount, fashion, new",
      url: `${process.env.NEXT_PUBLIC_URL}`,
      imgURL: `${process.env.NEXT_PUBLIC_URL}/images/${process.env.NEXT_PUBLIC_CONFIG}-logo.png`,
    },
    newArrivalCat: {
      title: "Buy Best Women Online At Cheap Price, Women & Qatar Shopping",
      description:
        "qtdealz big discount sale in Qatar, women clothes, women shoes, women fashion Qatar",
      keywords: "big discount women fashion, women clothes, online shopping Qatar",
      url: `${process.env.NEXT_PUBLIC_URL}`,
      imgURL: `${process.env.NEXT_PUBLIC_URL}/images/${process.env.NEXT_PUBLIC_CONFIG}-logo.png`,
    },
    clearanceCat: {
      title: "Big discount Qatar, women clothes Qatar, free shipping Qatar, women fashion Qatar",
      description:
        "qtdealz big discount sale in Qatar, women clothes, women shoes, women fashion Qatar",
      keywords: "women shoes, women fashion, women clothes, online shopping Qatar",
      url: `${process.env.NEXT_PUBLIC_URL}`,
      imgURL: `${process.env.NEXT_PUBLIC_URL}/images/${process.env.NEXT_PUBLIC_CONFIG}-logo.png`,
    },
  },
  siteInfo: {
    certificateURL: "https://theqa.qa/certificates/details/e2090aed-f966-440f-895c-00a88c388489",
  },
};

export default qtdealz;
