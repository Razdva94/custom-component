import React from "react";
import TableTemplate from "react-bootstrap/Table";
import shopsRawData from "../mock_stores.json";

function Table() {
  const [shopsData, setShopsData] = React.useState(shopsRawData);

  // function inputBenefitByUser(event){

  // }

  function MonthValue(value) {
    console.log(value);
  }
  MonthValue();
  const singleShopYearBenefit = shopsData.map(function (shop) {
    return shop.months.reduce(function (sum, month) {
      return sum + month.value;
    }, 0);
  });
  const allShopsMonthBenefit = [];
  for (let i = 0; i < 12; i++) {
    allShopsMonthBenefit[i] = shopsData.reduce(function (sum, shop) {
      sum = sum + shop.months[i].value;
      return sum;
    }, 0);
  }
  const totalRawBenefit = allShopsMonthBenefit.map((benifit, i) => {
    return (
      <td key={i} className="table__size">
        <input
          type="text"
          className="table__size"
          value={`за месяц ${benifit}`}
          readOnly
        />
      </td>
    );
  });
  const shops = shopsData.map((shop, i) => {
    const monthsRow = shop.months.map((month) => {
      return (
        <React.Fragment key={month.id}>
          <MonthValue value={month.value} />
          <td className="table__size">
            <input
              type="text"
              className="table__size"
              defaultValue={month.value}
              // onChange={""}
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
            value={`за год ${singleShopYearBenefit[i]}`}
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
              <input type="text" className="table__size" value={"а"} readOnly />
            </td>
          </tr>
        </tbody>
      </TableTemplate>
    </form>
  );
}
export default Table;
