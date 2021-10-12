export type Product = {
    id: number,
    description: string,
    image: string,
    model: string,
    name: string,
    price: string,
    priceInCents: number,
    sizes: string[],
    special: string,
    specialInCents: number,
    size: undefined | string,
    quantity: number
}

export type Products = {
    count: number,
    data: Product[],
    page: number,
    pageCount: number,
    total: number
}

export interface ModalState {
    visible: boolean,
    toggleVisible(): void
}

export interface Cart {
    add(product: Product): void,
    remove(product: Product): void,
    productsInCart: Product[],
    quantity: number,
    modalState: ModalState,
    updateSize(size: string): void,
    isInCart(item: Product): boolean,
    clear(): void
}