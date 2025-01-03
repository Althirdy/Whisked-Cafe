export type price = {
    size: string,
    price: number
}
export type addOns = {
    name: string,
    price: number
}

export type Meal_T = {
    id: number
    mealName: string,
    mealPrices: price[]
    mealCategory: number,
    image: string
}

export type PosMealOrder = {
    
    id:number,
    mealOrderId?: number
    mealName: string,
    mealPrice?: price | number,
    addOns?: addOns[],
    totalPrice?: number,
    quantity: number,
    sugarLevel?: string,
    originalPrice: number,
    mealCategory: number
}

/**
 *@POS_T
 *customerName
 *paymentMethod: Gcash or Cash
 * orderType: Dine-in or Take-Out
 *   
 */

export type POS = {
    customerName?: string,
    paymentMethod?: string,
    orderType?: string
    meals: PosMealOrder[],
    totalPrice?: number,
}