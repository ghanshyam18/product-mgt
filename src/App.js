import { useEffect, useState } from 'react';
import { Button, Divider, Layout, Menu, Popconfirm, Rate, Space, Table, Typography } from 'antd';
import './App.css';
import ProductForm from './components/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './store/products/slice';
import { ContainerOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProductFilter from './components/ProductFilter';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [visible, setVisible] = useState(null);

  // For Filters and Sorting
  const [prodList, setProdList] = useState([]);
  const [sorting, setSorting] = useState({});

  const { productList } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const closeModal = () => {
    setVisible(false)
  };

  useEffect(() => {
    setProdList(productList);
  }, [productList]);

  const submitProduct = (vals) => {
    const pList = [...productList];

    if (vals.id) {
      const fi = pList.findIndex((p) => p.id === vals.id);
      pList[fi] = { ...vals };
    } else {
      pList.push({ id: Math.random().toString(16).slice(2), ...vals });
    }

    dispatch(setProducts(pList));
    closeModal();
  };

  const deleteProduct = (id = '') => {
    const pList = [...productList];
    const fi = pList.findIndex((p) => p.id === id);
    if (fi > -1) {
      pList.splice(fi, 1);
      dispatch(setProducts(pList));
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const pList = [...productList];
    setProdList(pList.filter((p) => p.name.toLowerCase().indexOf(value.toLowerCase()) > -1 || p.description.toLowerCase().indexOf(value.toLowerCase()) > -1 || p.price.toString().toLowerCase().indexOf(value.toLowerCase()) > -1));
  };

  const handleSort = (val, type = '') => {
    const pList = [...productList];

    // At one time only one type of sorting will be work
    // That's why remove old one from sorting object
    setSorting({ [type]: val });

    setProdList(pList.sort((a, b) => {
      if (val === 'asc') {
        return a[type] - b[type];
      }
      if (val === 'desc') {
        return b[type] - a[type];
      }
      return 0;
    }));
  }

  return (
    <Layout>
      <Sider trigger={null}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <ContainerOutlined />,
              label: 'Manage Products',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="custom-header">
          <Title level={2}>Product Dashboard</Title>
        </Header>
        <Content
          className="site-layout-background"
        >
          <div className="product-main">
            <div className="product-filter">
              <ProductFilter sorting={sorting} handleSort={handleSort} handleSearch={handleSearch} />
              <div className="spacer" />
              <Button type="primary" onClick={() => setVisible({})}>Add</Button>
            </div>
            <Table
              dataSource={prodList}
              key={(p) => p.id}
              columns={[
                { dataIndex: 'id', title: 'Id' },
                { dataIndex: 'name', title: 'Name' },
                { dataIndex: 'description', title: 'Description' },
                {
                  dataIndex: 'rating',
                  title: 'Rating', 
                  render: (rate) => <Rate value={rate} disabled />
                },
                {
                  dataIndex: 'price',
                  title: 'Price',
                  render: (price) => {
                    return `$${price}`; 
                  },
                },
                {
                  dataIndex: 'actions',
                  title: 'Actions', 
                  render: (_, data) => {
                    return (
                      <div>
                        <Space split={<Divider type="vertical" />}>
                          <Button onClick={() => setVisible(data)} shape="circle"><EditOutlined /></Button>
                          <Popconfirm onConfirm={() => deleteProduct(data.id)} title="Are you sure？" okText="Yes" cancelText="No">
                            <Button shape="circle" danger><DeleteOutlined /></Button>
                          </Popconfirm>
                        </Space>
                      </div>
                    );
                  }
                },
              ]}
            />
            <ProductForm visible={visible} onCancel={closeModal} submitProduct={submitProduct} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
