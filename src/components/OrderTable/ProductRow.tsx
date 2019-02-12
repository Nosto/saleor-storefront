import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { CachedThumbnail, DebouncedTextField } from "..";
import { Checkout_lines_variant } from "../../checkout/types/Checkout";
import { generateProductUrl } from "../../core/utils";
import { VariantList_productVariants_edges_node } from "../../views/Product/types/VariantList";
import { Order_order_lines } from "../../views/Order/types/Order";

import cartAddImg from "../../images/cart-add.svg";
import cartRemoveImg from "../../images/cart-remove.svg";
import cartSubtractImg from "../../images/cart-subtract.svg";
import { CartLine } from "../CartProvider/context";

export type LineI = (
  | Order_order_lines) & {
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: LineI;
}

export interface EditableProductRowProps {
  processing?: boolean;
  invalid?: boolean;
  add?(variantId: string): void;
  changeQuantity?(lines: CartLine[]): void;
  remove?(variantId: string): void;
  subtract?(variantId: string): void;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  invalid,
  add,
  changeQuantity,
  mediumScreen,
  processing,
  remove,
  subtract,
  line
}) => {
  const productUrl = "";
  const editable = !!(add && subtract && remove && changeQuantity);

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing
      })}
    >
    <td className="cart-table__thumbnail">
      <div>
        <Link to={productUrl}>
          {line.productName}
          {line.productName && ` (${line.productName})`}
        </Link>
      </div>
    </td>

    {mediumScreen && <td>{line.unitPrice.gross.localized}</td>}

    <td className="cart-table__quantity-cell">
      <p>{line.quantity}</p>
    </td>
    <td>{line.unitPrice.gross.localized}</td>
    <td>
      <p></p>
    </td>
    </tr>
  );
};

export default ProductRow;
