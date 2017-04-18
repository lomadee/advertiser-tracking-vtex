//Vtex - Nova integração Lomadee

function pageData(){
	var t = [];
	
for(var cont = 0; cont<dataLayer.length; cont++){
		switch(dataLayer[cont]["pageCategory"]){
			case "Home":
				var lomadee_datalayer = {
					"page" : "home"
				};
				return lomadee_datalayer;
				break;
				
			case "InternalSiteSearch":
				var lomadee_datalayer = {
					"page" : "search",
					"keyword" : dataLayer[cont]["siteSearchTerm"]
				};
				return lomadee_datalayer;
				break;
			case "Product":	
			var sku = Object.keys(dataLayer[cont]["skuStocks"]);
				var lomadee_datalayer = {
					"page" : "product",
					"product" : {
						"sku" : sku[0],
						"price" : dataLayer[cont]["productPriceTo"],
						"available" : true
					}
				};
				return lomadee_datalayer;
				break;
			}
			
		
		//Página de Carrinho
		if(dataLayer[cont]["event"]=="cart"){
			
			var contInterno;
			var skus = "";
			for(contInterno=0; contInterno+1<dataLayer[cont]["orderFormProducts"].length; contInterno++)
			{
				
				skus +=dataLayer[cont]["orderFormProducts"][contInterno]["sku"] +",";
			}
			skus +=dataLayer[cont]["orderFormProducts"][contInterno]["sku"];
			
			var lomadee_datalayer = {
				"page" : "cart",
				"cart" : {
					"skus" : skus
				}
			};
			return lomadee_datalayer;
			
		}
		
		//Página de Sucesso
		if(dataLayer[cont]["event"]=="orderPlaced"){
			
			var contInterno;
			var items = [];
			for(contInterno=0; contInterno<dataLayer[cont]["transactionProducts"].length; contInterno++){
				
			items[contInterno]={
				"sku": dataLayer[cont]["transactionProducts"][contInterno]["sku"],
				"category": dataLayer[cont]["transactionProducts"][contInterno]["category"],
				"price": dataLayer[cont]["transactionProducts"][contInterno]["price"],
				"quantity": dataLayer[cont]["transactionProducts"][contInterno]["quantity"]
				};
				
			}
			var payment;
		if(dataLayer[cont]["transactionPaymentType"][0]["group"]){
			payment="bb";
		}else{
			payment="fp";
		}
			
			
			var lomadee_datalayer = {
				"page" : "conversion",
				"conversion" : {
					"transactionId" : dataLayer[cont]["transactionId"],
					"currency" : "BRL",
					"paymentType" : payment,
					"items" : items
					
				}
			};
			return lomadee_datalayer;
			
		}
		
					
	}
}
var lomadee_datalayer = pageData();


