import React from "react";
import TableTemplate from "react-bootstrap/Table";
import shopsRawData from "../mock_stores.json";

function Table() {
  const [shopsData, setShopsData] = React.useState(shopsRawData);
  const handleMonthValueChange = (shopIndex, monthIndex, newValue) => {
    setShopsData(prevShopsData => {
      const updatedShopsData = [...prevShopsData];
      updatedShopsData[shopIndex].months[monthIndex].value = newValue;
      return updatedShopsData;
    });
  };
  const singleShopYearBenefit = shopsData.map(function (shop) {
    return shop.months.reduce(function (sum, month) {
      return sum + Number(month.value);
    }, 0);
  });
  const allShopYearBenefit = singleShopYearBenefit.reduce(function(sum, currentValue){
  return sum + currentValue
  })
  const allShopsMonthBenefit = [];
  for (let i = 0; i < 12; i++) {
    allShopsMonthBenefit[i] = shopsData.reduce(function (sum, shop) {
      sum = sum + Number(shop.months[i].value);
      return sum;
    }, 0);
  }
  const totalRawBenefit = allShopsMonthBenefit.map((benifit, i) => {
    return (
      <td key={i} className="table__size">
        <input
          type="text"
          className="table__size"
          value={benifit}
          readOnly
        />
      </td>
    );
  });
  const shops = shopsData.map((shop, shopIndex) => {
    const monthsRow = shop.months.map((month, monthIndex) => {
      return (
        <React.Fragment key={month.id}>
          <td className="table__size">
            <input
              type="text"
              className="table__size"
              value={month.value}
              onChange={(e) => handleMonthValueChange(shopIndex, monthIndex, e.target.value)}
            />
          </td>
        </React.Fragment>
      );
    });
    return (
      <tr key={shop.store.id} className="table__size">
        <td className="table__size table__store-name">{shop.store.name}</td>
        {monthsRow}
        <td>
          <input
            type="text"
            className="table__size"
            value={singleShopYearBenefit[shopIndex]}
            readOnly
          />
        </td>
      </tr>
    );
  });
  return (
    <form className="body">
      <TableTemplate striped="columns" size="xl">
        <tbody>
          {shops}
          <tr>
            <td className="table__size table__store-name">Total</td>
            {totalRawBenefit}
            <td className="table__size table__stor-name">
              <input type="text" className="table__size" value={allShopYearBenefit} readOnly />
            </td>
          </tr>
        </tbody>
      </TableTemplate>
    </form>
  );
}
export default Table;
