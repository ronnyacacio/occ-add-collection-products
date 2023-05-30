require('dotenv/config');
const {getCollectionsProducts, updateCollectionsProducts} = require('./occ/collections-products');

const index = async () => {
  const collectionsProducts = await getCollectionsProducts();
  await updateCollectionsProducts(collectionsProducts);
}

index();
