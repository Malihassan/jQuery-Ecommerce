const readCategories =async () => {
    let categories ;
    await $.getJSON('../category.json', function(data) {
        categories = data
    });
    return categories    
};
const getCategoryByName =async (name)=>{
    let categories  =await readCategories()
    let specificCategory = categories.filter(item=>{
        return item.categoryName ==name
    })
    return specificCategory

}
const getProductById = async (name,id)=>{
    let categories  =await getCategoryByName(name)
    let specificItem = categories[0].items.filter(item=>{
        return item.id == id
    })
    return specificItem
}
const getAllCategoryType =async ()=>{
    let categories =await readCategories()
    let categoriesName = categories.map(item=>{
        return item.categoryName
    })
    return categoriesName
}
export {getCategoryByName,getAllCategoryType,getProductById};
