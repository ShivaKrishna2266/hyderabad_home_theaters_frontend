export interface ProductDTO{
    productId: number,
    productName: string,
    stockQuantity: number,
    status: boolean,
    productPrice: number,
    productRank: number,
    productSku: string,
    imageName: string,
    imageURL: string,
    categoryId: number,
    brandId: number,
    subCategoryId: number,
    reviewId: number,

    originalPrice: number;        // Should be a number for proper calculations
    discountedPrice: number;      // Should be a number
    discountPercentage: number;   // Percentage values should be number (e.g., 10.5)
    taxPercentage: number;        // Tax percentages should also be a number
    currency: string;             // String (e.g., "USD", "INR")
    color: string;                // String (e.g., "Red", "Blue")
    size: string;                 // String (e.g., "M", "L", "XL")
    weight: number;               // Weight should be a number (e.g., 1.5 kg)
    dimensions: string;           // String (e.g., "10x5x3 cm")
    material: string;             // String (e.g., "Cotton", "Metal")
    warrantyPeriod: number;       // Should be a number (e.g., 12 for months, 2 for years)
    description:string;
}