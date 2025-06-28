import { seedAdminUser } from "./seed-admin.js";
import { seedProductCategories } from "./seed-category.js";
import { seedCustomerCategories } from "./seed-customer-category.js";
import { seedLocationWithTransaction } from "./seed-location.js";
import { seedProducts } from "./seed-products.js";
async function Seed() {
    // await seedCustomerCategories();
    // await seedLocationWithTransaction();
    // await seedProductCategories();
    // await seedAdminUser();
    await seedProducts();
}

Seed().catch((e) => console.log(e));
