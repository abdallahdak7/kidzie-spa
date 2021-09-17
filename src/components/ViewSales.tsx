import { Col, DatePicker, Form, message, Row, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../customs/CustomButton";
import { CustomInput } from "../customs/CustomInput";
import { editProducts } from "../helpers/edit-products.helper";
import { getProductId } from "../helpers/get-product-id.helper";
import {
  editProduct,
  filterProducts,
  getProductsById,
} from "../services/products";

const columns = [
  {
    title: "Picture & Details",
    dataIndex: "details",
    render: (details: any) => (
      <Row>
        <Col span={12}>
          <img
            style={{ width: "150px", height: "100px" }}
            src={details.imageUrl}
            alt=""
          />
        </Col>
        <Col span={12}>
          <h1>{details.brand}</h1>
          <span>{details.description}</span>
        </Col>
      </Row>
    ),
  },
  {
    title: "OnSale?",
    dataIndex: "onSale",
    render: (onSale: string) => onSale,
  },
  {
    title: "Sale Starts",
    dataIndex: "saleStarts",
    render: (saleStarts: string) => saleStarts,
  },
  {
    title: "Sale Ends",
    dataIndex: "saleEnds",
    render: (saleEnds: string) => saleEnds,
  },
  {
    title: "Sale %",
    dataIndex: "salePercentage",
    render: (salePercentage: string) => salePercentage,
  },
];

interface IProps {
  products?: any[];
  signedIn?: any;
}

const ViewSales = ({ signedIn, products }: IProps) => {
  const [form] = useForm();
  const [productsId, setProductsId] = useState([]);
  const [toggleSale, setToggleSale] = useState(false);
  const [tableProducts, setTableProducts] = useState([]);
  const [kidzieId, setKidzieId] = useState("");
  const [onSale, setOnSale] = useState("");
  const [salePercentage, setSalePercentage] = useState("");
  const [designer, setDesigner] = useState("");

  const onFirstFinish = async (data: any) => {
    const payload: any = {};
    if (kidzieId) {
      payload.kidzieId = kidzieId;
    }
    if (onSale) {
      payload.onSale = onSale;
    }
    if (salePercentage) {
      payload.salePercentage = salePercentage;
    }
    if (designer) {
      payload.brand = designer;
    }
    if (data.salesFrom) {
      payload.saleStarts = data.salesFrom.format("DD-MM-YYYY");
    }
    if (data.salesTo) {
      payload.saleEnds = data.salesTo.format("DD-MM-YYYY");
    }

    const [error, filteredProducts] = await filterProducts(payload);
    if (!error) {
      setTableProducts(editProducts(filteredProducts));
      if (filteredProducts.length <= 0) {
        setTableProducts(editProducts([""]));
      }
    }
  };

  const removeSale = async () => {
    const payload = {
      saleStarts: "-",
      saleEnds: "-",
      salePercentage: "-",
      onSale: "No",
      productsId,
    };
    const [error] = await editProduct(payload);
    if (error) {
      message.error("Failed to send request");
      return;
    }
    const [_, products] = await getProductsById(signedIn.partner_id);
    if (!_) {
      setTableProducts(() => editProducts(products));
    }
  };
  const onSecondFinish = async (data: any) => {
    const payload = {
      ...data,
      saleStarts: data.saleStarts.format("DD-MM-YYYY"),
      saleEnds: data.saleEnds.format("DD-MM-YYYY"),
      onSale: "Yes",
      productsId,
    };
    const [error] = await editProduct(payload);
    if (error) {
      message.error("Failed to send request");
      return;
    }
    const [_, products] = await getProductsById(signedIn.partner_id);
    if (!_) {
      setTableProducts(() => editProducts(products));
    }
  };
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setProductsId(getProductId(selectedRows));
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };

  // const onSaleChange = async (data: any) => {
  //   data === "Yes" ? setAllowInput(true) : setAllowInput(false);
  //   const [_, products] = await getProductsById(signedIn.partner_id);
  //   const filteredProducts = products.filter(x => x.on_sale === data);
  //   if (!_) {
  //     setTableProducts(() => editProducts(filteredProducts));
  //   }
  //   console.log(filteredProducts);
  // };
  // const onPercentageChange = async (data: any) => {
  //   const [_, products] = await getProductsById(signedIn.partner_id);
  //   const filteredProducts = products.filter(x => x.sale_percentage === data);
  //   if (!_) {
  //     setTableProducts(() => editProducts(filteredProducts));
  //   }
  //   console.log(filteredProducts);
  // };

  useEffect(() => {
    return () => {};
  }, [tableProducts, setTableProducts]);

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="form-header">Sales</div>
        </Col>
      </Row>
      <Row
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "#faf6e6",
        }}
      >
        <Col span={24}>
          <Form onFinish={onFirstFinish}>
            <Row
              style={{
                margin: "10px",
                padding: "10px",
                backgroundColor: "#faf6e6",
              }}
            >
              <Col span={24}>
                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    <div
                      style={{
                        fontWeight: "bolder",
                        padding: "8px",
                        marginLeft: "15px",
                      }}
                    >
                      Kidzie ID
                    </div>
                    <CustomInput
                      onChange={e => setKidzieId(e.target.value)}
                      type="number"
                      name="kidzieId"
                    />
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    <div style={{ fontWeight: "bolder", padding: "10px 8px" }}>
                      From
                    </div>
                    <Form.Item name="salesFrom">
                      <DatePicker
                        format="DD-MM-YYYY"
                        size="large"
                        style={{ border: "2px solid #ba9541" }}
                      />
                    </Form.Item>{" "}
                    <div style={{ fontWeight: "bolder", padding: "10px 8px" }}>
                      To
                    </div>
                    <Form.Item name="salesTo">
                      <DatePicker
                        format="DD-MM-YYYY"
                        size="large"
                        style={{ border: "2px solid #ba9541" }}
                      />
                    </Form.Item>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <hr style={{ backgroundColor: "#ba9541" }} />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      Product Group
                    </div>
                    <select
                      defaultValue=""
                      // onChange={e => setUserType(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="productGroup"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Winter Collection">
                        Winter Collection
                      </option>
                      <option value="Summer Collection">
                        Summer Collection
                      </option>
                      <option value="Fall Collection">Fall Collection</option>
                      <option value="Spring Collection">
                        Spring Collection
                      </option>
                    </select>{" "}
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    &nbsp;
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      On Sale?{" "}
                    </div>
                    <select
                      defaultValue=""
                      onChange={e => setOnSale(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="onSale"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      Age Group{" "}
                    </div>
                    <select
                      defaultValue=""
                      // onChange={e => setUserType(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="ageGroup"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="0-4">0-4</option>
                      <option value="5-9">5-9</option>
                      <option value="10-14">10-14</option>
                      <option value="15-17">15-17</option>
                      <option value="18-19">18-19</option>
                      <option value="20-24">20-24</option>
                      <option value="25-29">25-29</option>
                    </select>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    &nbsp; &nbsp; &nbsp;
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      Sale %{" "}
                    </div>
                    <select
                      defaultValue=""
                      onChange={e => setSalePercentage(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="salePercentage"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="10%">10%</option>
                      <option value="20%">20%</option>
                      <option value="30%">30%</option>
                      <option value="40%">40%</option>
                      <option value="50%">50%</option>
                      <option value="60%">60%</option>
                      <option value="70%">70%</option>
                      <option value="80%">80%</option>
                      <option value="90%">90%</option>
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      Gender{" "}
                    </div>
                    <select
                      defaultValue=""
                      // onChange={e => setUserType(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="gender"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    &nbsp;
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      Designer{" "}
                    </div>
                    <select
                      defaultValue=""
                      onChange={e => setDesigner(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="designer"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="GUCCI">GUCCI</option>
                      <option value="HERMES">HERMES</option>
                      <option value="CHANEL">CHANEL</option>
                    </select>
                  </Col>
                </Row>

                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={12}
                  >
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <div style={{ fontWeight: "bolder", padding: "20px 10px" }}>
                      Categories{" "}
                    </div>
                    <select
                      defaultValue=""
                      // onChange={e => setUserType(e.target.value)}
                      style={{
                        margin: "10px 0px",
                        width: "206px",
                        border: "2px solid #ba9541",
                      }}
                      name="category"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Shirts">Shirts</option>
                      <option value="Polos">T-Shirts</option>
                      <option value="Graphics">Graphics</option>
                    </select>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    span={11}
                  >
                    <div
                      style={{
                        fontWeight: "bolder",
                        padding: "8px",
                        marginLeft: "15px",
                      }}
                    >
                      General Search
                    </div>
                    <CustomInput name="generalSearch" />
                  </Col>
                </Row>

                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "right" }}
                    span={24}
                  >
                    <div style={{ width: "250px" }}>
                      <CustomButton type="submit" value="Search" />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={24} style={{ padding: "0 15px" }}>
              <hr style={{ backgroundColor: "#ba9541" }} />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ padding: "0 15px" }}></Col>
          </Row>

          <Row>
            <Col span={24}>
              <Table
                style={{
                  backgroundColor: "#faf6e6",
                  border: "2px solid #ba9541",
                  margin: "15px",
                  padding: "8px",
                }}
                rowKey={record => record.key}
                dataSource={
                  tableProducts.length > 0
                    ? tableProducts
                    : editProducts(products)
                }
                columns={columns}
                rowSelection={rowSelection}
                pagination={{ pageSize: 3 }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12} style={{ padding: "0 15px" }}></Col>
            <Col span={12} style={{ padding: "0 15px", display: "flex" }}>
              <CustomButton onClick={removeSale} value="Remove Sale" />
              &nbsp;&nbsp;
              <CustomButton
                onClick={() => setToggleSale(!toggleSale)}
                value="Add Sale"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {toggleSale && (
        <>
          <Row>
            <Col span={24}>
              <div className="form-header">Add Sale</div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form form={form} onFinish={onSecondFinish}>
                <Row
                  style={{
                    margin: "10px",
                    padding: "10px",
                    backgroundColor: "#faf6e6",
                  }}
                >
                  <Col span={24}>
                    <Row>
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                        span={12}
                      >
                        <div style={{ fontWeight: "bolder", padding: "8px" }}>
                          Sale starts *
                        </div>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please select a date",
                            },
                          ]}
                          name="saleStarts"
                        >
                          <DatePicker
                            format="DD-MM-YYYY"
                            size="large"
                            style={{ border: "2px solid #ba9541" }}
                          />
                        </Form.Item>{" "}
                      </Col>
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                        span={12}
                      >
                        <div style={{ fontWeight: "bolder", padding: "8px" }}>
                          Sale % *
                        </div>
                        <CustomInput required={true} name="salePercentage" />
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                        span={12}
                      >
                        <div style={{ fontWeight: "bolder", padding: "8px" }}>
                          Sale Ends *
                        </div>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please select a date",
                            },
                          ]}
                          name="saleEnds"
                        >
                          <DatePicker
                            format="DD-MM-YYYY"
                            size="large"
                            style={{ border: "2px solid #ba9541" }}
                          />
                        </Form.Item>{" "}
                      </Col>
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                        span={12}
                      ></Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        {" "}
                        <Row>
                          <Col span={12}>
                            <CustomButton
                              onClick={() => setToggleSale(false)}
                              value="Cancel"
                            ></CustomButton>
                          </Col>
                          <Col span={12}></Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={12}></Col>
                          <Col span={12}>
                            <CustomButton
                              type="submit"
                              value="Save"
                            ></CustomButton>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
              <br /> <br />{" "}
            </Col>
          </Row>
        </>
      )}
      <br />
      <br />
    </>
  );
};

export default ViewSales;
