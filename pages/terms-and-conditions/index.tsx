import { Container, createTheme, ThemeProvider, Typography } from "@mui/material";
import HomeLayout from "components/layouts/homeLayout";
import appConfig from "config";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <HomeLayout>
      <Head>
        <title>Terms and conditions</title>
      </Head>
      <Container sx={{ my: 4 }} component="div">
        <h2>
          QTDEALZ.COM - Online portal of Dee Vinci Trading WLL, Office 14, Building Number 226
          street number 230 Zone 25, OPP AL EMADI BUSINESS CENTRE, NAJMA, C RING RD, Doha, Qatar:
        </h2>
        <div>
          Following below are the terms and conditions that govern the use of site on all of
          Qtdealz.com platforms i.e., www.Qtdealz.com and mobile applications. Please check Terms of
          use periodically. By Placing an order on the site, the customer agrees to the below
          mentioned Terms and conditions and privacy policy as specified.
        </div>
        <h2>CUSTOMERS WITH ORDERS OF 150 {appConfig.product.currency} OR MORE:</h2>
        <div>
          <ul>
            <li>
              We appreciate our customers for shopping for more than&nbsp;<b>150+ {appConfig.product.currency}</b>, for the
              same reason we are not receiving any delivery charges on orders of&nbsp;
              <b>150+ {appConfig.product.currency}</b> which are waived off just to improve our relationship with our
              customers, not only that our customers also receive a free return without any charges
              when they are not satisfied with even one of the ordered products or all.
            </li>
            <li>
              <strong>Refunds:</strong>If you are not&nbsp;<b>100%</b>&nbsp;satisfied with your
              purchase, just make sure to contact us within 7 days from the day your order is
              delivered and ensure that the item is in its original packaging, unworn and in the
              same condition you received it.
            </li>
            <li>
              <b>Replacement:</b>In case of replacement there will be no delivery charges applicable
              for the below reasons. Apart from the below reason customer will be asked to pay
              delivery charge of 10 {appConfig.product.currency} for replacement
              <ol>
                <li>Wrong Product delivered</li>
                <li>Damaged / Defective product delivered</li>
                <li>Wrong Qty delivered</li>
              </ol>
            </li>
          </ul>
        </div>
        <h2>CANCELLATION POLICY</h2>
        <div>
          <ul>
            <li>
              QTDEALZ customers can cancel their order any time before the order is&nbsp;
              <b>scheduled for delivery</b>&nbsp;and handed over to the Courier. For any cancelled
              orders QTDEALZ issues&nbsp;<b>full refund</b>&nbsp;that may take up to&nbsp;
              <b>3 to 30 working days</b>&nbsp;depending on the payment method and card issuing bank
              policy.
            </li>
          </ul>
        </div>
        <h2>TO RETURN THE ITEM</h2>
        <div>
          <ul>
            <li>
              Call our&nbsp;<b>Customer Support Team</b>&nbsp;on&nbsp;
              <b>++974 5030 3100, +974 4477 4100 between 9 Am to 6 PM Saturday to Thursday </b>
              within&nbsp;<b>7 Days</b>&nbsp;from the day your order is delivered to arrange a
              return.
            </li>
            <li>
              Items returned must be in their unused condition with the original packing. We do not
              accept a returned item that is worn, damaged, washed or altered in any way.
            </li>
            <li>
              Pack the item in its original state and packaging. Do not remove any code or labels on
              the box. Hand over the package to the courier representative.
            </li>
          </ul>
        </div>
        <h2>MAKEUP & COSMETICS</h2>
        <div>
          <ul>
            <li>
              All products should be used strictly in accordance with their instructions,
              precautions, and guidelines. You should always check the ingredients for products to
              avoid potential allergic reactions.
            </li>
          </ul>
        </div>
        <h2>THE FOLLOWING ITEMS CANNOT BE RETURNED OR EXCHANGED</h2>
        <div>
          <ul>
            <li>Lingerie</li>
            <li>Undergarments</li>
            <li>Swimwear & Beachwear</li>
            <li>Sportswear Bra</li>
          </ul>
        </div>
        <h2>MULTIPLE-PRODUCT ORDERS</h2>
        <div>
          <ul>
            <li>
              For multiple product orders, we will make every attempt to ship all items contained in
              that order at the same time. Products that are unavailable at the time of shipping
              will be canceled from the order, by calling you in a proper way. If the order is
              through Cash on delivery, then the payment will be deducted from Cash. If the payment
              is made through a card, then the payment will be received in full and will be returned
              once the products are delivered to you. The amount will be refunded to your credit
              card.
            </li>
            <li>
              You will only be charged for products given in your shipment, plus any applicable
              shipping charges. You will only be charged for shipping at the rate quoted to you on
              your purchase receipt. The entirety of this shipping charge will be applied to the
              first product(s) shipped on a multiple shipment order.
            </li>
          </ul>
        </div>
        <h2>SHIPPING POLICY</h2>
        <div>
          <ul>
            <li>
              Most orders will be delivered within the&nbsp;<b>Next Business Day&nbsp;</b>when the
              product ordered is in stock. Orders are not processed or shipped on Friday except by
              prior arrangements. We cannot guarantee when an order will be delivered. Consider any
              shipping or transit time offered to you by this site or other parties only as an
              estimate. We encourage you to order in a proper way to avoid delays caused by shipping
              or product availability. We share this information with our customers frequently that
              we have marked some&nbsp;<b>non-Service</b>&nbsp;areas in&nbsp;
              <b>QATAR</b>&nbsp;which are out of route, due to which we charge&nbsp;<b>{appConfig.product.currency} 20</b>
              &nbsp;as delivery charges on the request of&nbsp;<b>Courier Companies</b>
            </li>
            <li>
              We use&nbsp;<b>&quot;cookies&quot;&nbsp;</b>to keep track of your current shopping
              session to personalize your experience so that you may retrieve your shopping cart at
              any time.
            </li>
          </ul>
        </div>
        <h2>PRIVACY ON OTHER WEBSITES</h2>
        <div>
          <ul>
            <li>
              Other sites accessible through our site have their own privacy policies and data
              collection practices. Please consult each site's privacy policy for more
              information.&nbsp;<b>Qtdealz.com</b>&nbsp;is not responsible for the actions of third
              parties.
            </li>
          </ul>
        </div>
        <h2>LINKS</h2>
        <div>
          <ul>
            <li>
              This site may contain links to other sites on the Internet that are owned and operated
              by third parties. You acknowledge that&nbsp;<b>Qtdealz.com</b>&nbsp;is not responsible
              for the operation of, or content located on or throughout any such site.
            </li>
          </ul>
        </div>
        <h2>TYPOGRAPHICAL ERRORS</h2>
        <div>
          <ul>
            <li>
              In the event a product is listed at an incorrect price due to typographical error
              through our publishing department or any technical issues,&nbsp;<b>Qtdealz.com</b>
              &nbsp;shall have the right to refuse or cancel any orders placed for products listed
              at the incorrect price.&nbsp;<b>Qtdealz.com</b>&nbsp;shall also have the right to
              refuse or cancel any such orders whether or not the order has been confirmed and your
              credit card charged. If your credit card has already been charged for the purchase and
              your order is canceled,&nbsp;<b>Qtdealz.com&nbsp;</b>will issue a refund to your card
              in the amount of the incorrect price.
            </li>
          </ul>
        </div>
        <h2>ORDER ACCEPTANCE POLICY</h2>
        <div>
          <ul>
            <li>
              Your receipt of an electronic or another form of order confirmation does not signify
              our acceptance of your order, nor does it constitute confirmation of our offer to
              sell.&nbsp;<b>Qtdealz.com</b>&nbsp;reserves the right at any time after receipt of
              your order to accept or decline your order for any reason or to supply less than the
              quantity you ordered of any item.
            </li>
          </ul>
        </div>
        <h2>OTHER CONDITIONS</h2>
        <div>
          <ul>
            <li>
              Qtdealz.com will not trade or provide services to&nbsp;<b>OFAC or sanctioned</b>
              &nbsp;countries.
            </li>
            <li>Accepted modes of payments are Cash on delivery</li>
            <li>Users are responsible to keep the confidentiality of their accounts.</li>
            <li>
              Minors under the age of 18 shall not register as the user of the website and nor
              transact on the website.
            </li>
            <li>
              These conditions will supersede any terms and/or conditions you include with any
              purchase order, regardless of whether&nbsp;<b>Qtdealz.com</b>&nbsp;signs them or
              not.&nbsp;<b>Qtdealz.com</b>&nbsp;reserves the right to make changes to this site and
              these conditions at any time.
            </li>
          </ul>
        </div>
        <h2>COPYRIGHT AND TRADEMARK NOTICE</h2>
        <div>
          <ul>
            <li>
              Unless otherwise specified, all materials appearing on this site; including text, site
              design, logos, graphics, icons, and images, as well as the selection, assembly, and
              arrangement thereof, are the sole property of&nbsp;
              <b>Qtdealz.com, Copyright ©, All Rights Reserved</b>. You may use the content of this
              site only for the purpose of shopping in this store or placing an order and for no
              other purpose. No materials from this site may be copied, reproduced, modified,
              republished, uploaded, posted, transmitted, or distributed in any form or by any means
              without our prior written permission. All rights not expressly granted here are
              reserved. Any unauthorized use of the materials appearing on this site may violate
              copyright, trademark, and other applicable laws and could result in criminal or civil
              penalties.
            </li>
          </ul>
        </div>
        <h2>QTDEALZ.COM MARKETPLACE</h2>
        <div>
          <ul>
            <li>
              <b>Qtdealz.com </b>
              respects the rights and trademark of all the products and brands and does not allow
              any vendor or supp&nbsp;ier or seller to sell products that are prohibited under the
              same.
            </li>
            <li>
              The sellers are also advised on priority to please make sure that the&nbsp;
              <b>BRAND LOGOS, SIGNS, NAMES, or DESIGNS</b>&nbsp;are not printed on their products,
              any copy or brand logo, similar to any company or organization will not be allowed.
            </li>
            <li>
              Furthermore, we respect the dignity of all nationalities, therefore, products with
              changed country flags, color, or any modification will be rejected without intimation.
            </li>
            <li>
              Products that contain nudity, offensive language, sexual slang words, or abusive
              portrayal will be rejected accordingly.
            </li>
            <li>
              It is also being notified that the seller will solemnly be responsible for all the
              fines or penalties imposed due to breach of any policy or law from the ministry.
            </li>
          </ul>
        </div>
      </Container>
    </HomeLayout>
  );
}
