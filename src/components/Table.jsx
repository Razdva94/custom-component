import React from "react";
import TableTemplate from "react-bootstrap/Table";
import shopsRawData from "../mock_stores.json";

function Table() {

  const singleShopYearBenefit = shopsRawData.map(function (shop) {
    return shop.months.reduce(function (sum, month) {
      return sum + month.value;
    }, 0);
  });
  const allShopsMonthBenefit = [];
  for (let i = 0; i < 12; i++) {
    allShopsMonthBenefit[i] = shopsRawData.reduce(function (sum, shop) {
      sum = sum + shop.months[i].value;
      return sum;
    }, 0);
  }
  const totalRawBenefit = allShopsMonthBenefit.map((benifit, i) => {
    return (
        <td key={i} className="table__size">
          <input type="text" className="table__size" value={benifit} />
        </td>
    );
  });
  const shops = shopsRawData.map((shop, i) => {
    const monthsRow = shop.months.map((month) => {
      return (
          <td key={month.id}>
            <input
              type="text"
              className="table__size"
              value={month.value}
            />
          </td>
      );
    });
    return (
        <tr key={shop.store.id}>
          <td className="table__size table__store-name">{shop.store.name}</td>
          {monthsRow}
          <td>
            <input type="text" className="table__size" value={singleShopYearBenefit[i]} />
          </td>
        </tr>
    );
  });
  return (
    <form>
      <TableTemplate striped="columns" size="xl">
        <tbody>
          {shops}
          <tr>
            <td className="table__size table__store-name">Total</td>
            {totalRawBenefit}
            <td className='table__size table__stor-name'><input type='text' className="table__size" value={''} /></td>
          </tr>
        </tbody>
      </TableTemplate>
    </form>
  );
}

export default Table;
