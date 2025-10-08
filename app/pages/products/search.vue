<template>
    <div class="container-fluid mb-9">
      <h2 class="top-10">Search Product</h2>

      <form class="row g-3" @submit.prevent="submitSearchForm" autocomplete="off">
          <div class="col-auto">
            <input type="text" required class="form-control-sm" v-model="vardata.search" name="search" placeholder="enter description">
            <div class="align-middle text-left text-danger">{{ vardata.listMsg }}</div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary btn-sm mb-3">search</button>
          </div>
      </form>

      <div class="container-fluid mb-9">
      <div class="card-group">
         <div v-for="product in vardata.prods" class="col-md-4">
          <div class="card cardx mx-3">
            <img :src="product.productPicture" class="card-img-top" alt="...">
            <div class="card-body card-text">
              <h5 class="card-title">Descriptions</h5>
              <p class="card-text">{{product.descriptions}}</p>
            </div>
            <div class="card-footer">
                <p class="card-text text-danger"><span class="text-dark">PRICE :</span>&nbsp;<strong>&#8369;{{formatNumberWithCommaDecimal(product.sellPrice) }}</strong></p>
            </div>  
          </div>
        </div>
      </div>    
      </div>
        <!-- <div v-if="vardata.totpage !== 0">
        <nav aria-label="Page navigation example">
            <ul class="pagination mt-2 mb-4">
                <li class="page-item"><a @click="firstPage($event)" class="page-link" href="#">First</a></li>
                <li class="page-item"><a @click="prevPage($event)" class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a @click="nextPage($event)" class="page-link" href="#">Next</a></li>
                <li class="page-item"><a @click="lastPage($event)" class="page-link" href="#">Last</a></li>              
                <li class="page-item page-link text-danger">Page&nbsp;{{vardata.page}} of&nbsp;{{vardata.totpage}}</li>
            </ul>
          </nav>
        </div> -->
      <br/><br/></br>
      <!-- <Footer/> -->
    </div>
</template>

<script setup lang="ts">
    // import Footer from '../../layouts/Footer.vue';
    import {reactive} from 'vue'
    import axios from 'axios';

    const api = axios.create({
      baseURL: "https://localhost:7292",
      headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
    })

    export type Products = {
        id: number;
        descriptions: string;
        qty: number;
        unit: string;
        sellPrice: number;
        productPicture: string;
    }

    export type Productdata = {
        products: Products[];
    }

  const vardata = reactive({
      search: '',
      prods: [],
      // isfound: false,
      listMsg: '',
      page: 1,
      totpage: 0,
      totRecs: 0
  });

  const formatNumberWithCommaDecimal = (number: any) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Ensures at least two decimal places
      maximumFractionDigits: 2, // Limits to two decimal places
    });
    // Format the number
    return formatter.format(number);
  };

  const searchProducts = (key: any) => {
      // vardata.isfound=true;
      // vardata.listMsg = 'searching, please wait..';

      // await api.get(`/api/searchproducts/${pg}/${key}`)
                const formData = JSON.stringify({ search: key});
                 api.post<Productdata>("/api/searchproducts", formData)
                .then((res) => {
                  const data: Productdata = res.data;
                    vardata.prods = data.products;
                    // vardata.totpage = res.data.totpage;
                    // vardata.page = res.data.page;
                    // vardata.isfound = true;
                    setTimeout(() => {
                      vardata.listMsg = '';
                    }, 3000);
                }, (error: any) => {
                    // vardata.isfound = false;
                    vardata.listMsg = error.response.data.message;
                    vardata.prods = [];
                    setTimeout(() => {
                      vardata.listMsg = '';
                    }, 3000);
                    return;
                });    
  }

  const submitSearchForm = () => {
    searchProducts(vardata.search);
  }

  // const nextPage = async (event: any) => {
  //           event.preventDefault();    
  //           if (vardata.page === vardata.totpage) {
  //               return;
  //           }
  //           vardata.page = vardata.page + 1;
  //           await searchProducts(vardata.page, vardata.search);
  //           return;
  // }

  // const prevPage = async(event: any) => {
  //           event.preventDefault();    
  //           if (vardata.page === 1) {
  //           return;
  //           }
  //           vardata.page = vardata.page - 1;
  //           await searchProducts(vardata.page, vardata.search);
  //           return;    
  // }
  // const firstPage = async(event: any) => {
  //         event.preventDefault();    
  //         vardata.page = 1;
  //         await searchProducts(vardata.page, vardata.search);
  //         return;    
  // }

  // const lastPage = async (event: any) => {
  //     event.preventDefault();    
  //     vardata.page = vardata.totpage;
  //     await searchProducts(vardata.page, vardata.search);
  //     return;    
  // }           

</script>

<style scoped>
.top-10 {
    margin-top: 10px;
}

.product-size {
    width: 300px;
    height: auto;
}
</style>