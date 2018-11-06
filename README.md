# Bamazon_mySQL

## Customer Front
In this portion of the app, the customer is able to view products and purchase them. On load, the customer is shown the products that are for sale in the store. They are seperated by their Item Id, and are listed with the produce name and price.  
  
* When a customer is ready to purchase an item they simply select purchase an item, which is toggled by arrow keys via the inquire npm.  
* Customer is then prompted to select an item by ID, which is given to them when they load up the bamazonCustomer.js, they are then prompted to input a quantity.   
* Once the ID and quantity are given by the user, the terminal will then display a message letting the user know what they purchased, and how much the total cost was.

## Manager Front
In this portion of the app, the manager is able to view products, inventory, add to inventory, and add new products.  On load, the app gives the manager the option to perform one of these actions by selecting from the list via toggling with the arrow keys.  
  
* When the manager selects to **View All Products**, it loads all of the items, seperated by ID, and gives the manager the product name, the price, and the quantity in inventory.  
* When the manager selects **View low inventory**, it will load in a similiar way as viewing all products, but it will only display products with a quantity of less than 5.  If all quantities are at 5 or greater, it displays a single message saying that all inventories are looking good.  
* When the manager selects **Add to Inventory**, it prompt for the item id, and the quanity that the manager will like to add.  When those are both submitted it displays a message that the inventories were updated, and gives the new quantity.  
* When the manager selects **Add New Product**, it prompts the manager for the product name, the price that it will be listed at, and the initial quantity that they will have in inventory.  This automatically is add to the *View All Products* section for both the Manager and the Customer.

### View a Video of the App in action via the Link Below
<https://drive.google.com/file/d/1C-mm9Kebkv24LIXB6XXftcJS3aiwtIo3/view>