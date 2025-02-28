import axios from "axios";
import { API_ENDPOINTS } from "../config";

export const fetchCustomers = async (updatedAtMin) => {
    try {
        const formattedDate = updatedAtMin ? `${updatedAtMin}T00:00:00Z` : new Date().toISOString();

        const response = await axios.post(API_ENDPOINTS.CUSTOMERS, {
            updated_at_min: formattedDate,
        });

        return response.data.data.customers.edges.map(edge => edge.node);
    } catch (error) {
        console.error("❌ Müşteri verileri alınamadı:", error);
        throw error; // Hata yakalanırsa, component'e iletilsin
    }
};
