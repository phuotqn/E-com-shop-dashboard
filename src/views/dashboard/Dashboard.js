import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button, Link, } from "@mui/material";


const Dashboard = () => {
  
  const [data,setData] = useState([]);

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchAPI("http://localhost:8000/products/?limit=8")
      .then((data) => {
        setData(data.data)
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);


  return (
    <Container>
      {/* Title */}
      <Container>
        <Grid item xs={12} mt={12} p={2}>
          <div>
            <h5 style={{fontFamily:"Roboto"}}>
              <b>WELCOME TO SHOP ONLINE</b>
            </h5>
          </div>
        </Grid>
      </Container>

      {/* ////////  * PRODUCT *    ////////////// */}
      <Container
      >
        <Grid container>
          {data.map((product, index) => {
            return (
              <Grid item xs={12} lg={3} md={3} sm={6} mb={3} className="p-3" key={index}>
                <Link href={product._id} style={{ textDecoration: "none" }}>
                  <div className="home-card">
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          width="200"
                          image={product.imageUrl}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            variant="body1"
                            component="div"
                            className="name-product"
                            style={{ height: "50px" }}
                          >
                            <b>{product.name}</b>
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                          >
                            <strike>{product.buyPrice}</strike>
                          </Typography>
                          <Typography variant="h6" sx={{ color: "red" }}>
                            <b>{product.promotionPrice}</b>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Grid item xs={12} style={{ textAlign: "center" }} mt={5}>
        <Link href="products" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#000" }}
          >
            Show All
          </Button>
        </Link>
      </Grid>
    </Container>
  );
}

export default Dashboard
