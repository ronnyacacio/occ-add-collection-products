const useOracle = require('./services/oracle');
const login = require('./login');

const getCollectionsProducts = async () => {
  const token = await login();
  const oracle = useOracle(process.env.STORE_URL, token);

  let limitPage = false;
  let offset = 0;
  let products = [];
  
  do {
    const response = await oracle.get('ccstore/v1/products', {params: {q: `displayName co "${process.env.PRODUCT_TERM}"`, queryFormat: 'SCIM', offset}});
    
    const {items} = response.data;
      
    products.push(...items);
      
    limitPage = items.length < 250;
    offset += 250;
  } while (!limitPage);

  const collectionsProducts = products.map(product => {
    const collections = product.parentCategories.map(parentCategory => parentCategory.repositoryId);
    return {id: product.id, collections}
  });

  return collectionsProducts;
};

const updateCollectionsProducts = async collectionsProducts => {
  
  try {
    const token = await login();
    const oracle = useOracle(process.env.ADMIN_URL, token);
    collectionsProducts.forEach(async collectionsProduct => {
      const collections = [...collectionsProduct.collections, process.env.COLLECTION_ID]
      await oracle.post(`ccadminui/v1/products/${collectionsProduct.id}/addToCollections`, {collections});
    });
  } catch (err) {
    console.log("🚀 ~ Error", err)
  } finally {
    console.log(`🚀 ~ ${collectionsProducts.length} produtos, com o termo "${process.env.PRODUCT_TERM}", adicionados à coleção "${process.env.COLLECTION_ID}"!`)
  }
};

module.exports = {getCollectionsProducts, updateCollectionsProducts};