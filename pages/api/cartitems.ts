import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'

const GET = async (request:NextRequest) => {
    const endpoint = "https://zuri-cart-checkout.onrender.com/transactions"
    const req = await fetch(endpoint,{
        method: "GET"
    })
    const body = await req.json();
    console.log(body);
    
    
}