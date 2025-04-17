import { PurchaseOrder } from "@/types";

export const mockOrders: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    status: "Approved",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-03-15",
    customerPoNumber: "AVT-2023-001",
    exporter: {
      name: "Green Highlands Avocado Farm",
      addressLine1: "123 Farming Zone",
      addressLine2: "Agricultural District",
      city: "Nairobi",
      country: "Kenya",
      postalCode: "00100",
      phone: "+254 20 1234567",
      email: "exports@ghaf.co.ke",
      registrationNumbers: [
        { type: "HCD License", value: "HCD/2024/123" },
        { type: "VAT", value: "VAT123456789" }
      ]
    },
    importer: {
      name: "Fresh Emirates Trading LLC",
      addressLine1: "Building 7, Dubai Food Park",
      city: "Dubai",
      country: "United Arab Emirates",
      postalCode: "12345",
      phone: "+971 4 123 4567",
      email: "imports@freshemirates.ae",
      registrationNumbers: [
        { type: "TRN", value: "100123456700003" }
      ]
    },
    shipmentDetails: {
      modeOfTransport: "Sea Freight",
      vesselOrFlightNumber: "MSC ISABELLA",
      blOrAwbNumber: "MSCUAE123456789",
      portOfLoading: "Mombasa, Kenya",
      portOfDischarge: "Jebel Ali, UAE",
      countryOfOrigin: "Kenya",
      countryOfDestination: "United Arab Emirates"
    },
    transactionDetails: {
      incoterms: "FOB Mombasa",
      termsOfPayment: "Letter of Credit",
      currency: "USD"
    },
    lineItems: [
      {
        productName: "Fresh Hass Avocados",
        grade: "Premium Grade A",
        sizeSpec: "Count 16",
        packagingType: "4kg Cartons",
        hsCode: "0804.40.00",
        quantity: 3000,
        unitPrice: 12.50,
        totalAmount: 37500.00
      }
    ],
    charges: {
      subtotal: 37500.00,
      packingCharges: 1500.00,
      totalAmount: 39000.00
    },
    shippingMarks: {
      description: "Fresh Emirates UAE",
      lotId: "LOT-2024-001",
      cartonRange: "1-3000"
    },
    declarations: [
      {
        type: "Origin",
        reference: "Certificate of Origin No. KE-2024-123"
      },
      {
        type: "Phytosanitary",
        reference: "Phyto Cert No. KEPHIS-2024-456"
      }
    ],
    bankDetails: {
      bankName: "Kenya Commercial Bank",
      accountName: "Green Highlands Avocado Farm",
      accountNumber: "1234567890",
      swiftCode: "KCBLKENX"
    },
    createdAt: "2024-03-14T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z"
  },
  {
    id: "PO-2024-002",
    status: "Pending",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "2024-03-16",
    customerPoNumber: "AVT-2023-002",
    exporter: {
      name: "Kenyan Avocado Cooperative",
      addressLine1: "456 Highland Road",
      city: "Nyeri",
      country: "Kenya",
      phone: "+254 20 9876543",
      email: "sales@kac.co.ke",
      registrationNumbers: [
        { type: "HCD License", value: "HCD/2024/456" },
        { type: "VAT", value: "VAT987654321" }
      ]
    },
    importer: {
      name: "Royal Greens Trading",
      addressLine1: "Building 7, Dubai Food Park",
      city: "Dubai",
      country: "United Arab Emirates",
      postalCode: "12345",
      phone: "+971 4 123 4567",
      email: "imports@royalgreens.ae",
      registrationNumbers: [
        { type: "TRN", value: "100123456700003" }
      ]
    },
    shipmentDetails: {
      modeOfTransport: "Sea Freight",
      portOfLoading: "Mombasa, Kenya",
      portOfDischarge: "Jebel Ali, UAE",
      countryOfOrigin: "Kenya",
      countryOfDestination: "United Arab Emirates"
    },
    transactionDetails: {
      incoterms: "CFR Jebel Ali",
      termsOfPayment: "Bank Transfer",
      currency: "USD"
    },
    lineItems: [
      {
        productName: "Fresh Hass Avocados",
        grade: "Premium Grade A",
        sizeSpec: "Count 18",
        packagingType: "4kg Cartons",
        hsCode: "0804.40.00",
        quantity: 2125,
        unitPrice: 14.00,
        totalAmount: 29750.00
      }
    ],
    charges: {
      subtotal: 29750.00,
      freightCharges: 3200.00,
      packingCharges: 1000.00,
      totalAmount: 33950.00
    },
    shippingMarks: {
      description: "Royal Greens UAE",
      lotId: "LOT-2024-002",
      cartonRange: "1-2125"
    },
    declarations: [
      {
        type: "Origin",
        reference: "Certificate of Origin No. KE-2024-124"
      },
      {
        type: "Organic",
        reference: "Organic Cert No. ORG-2024-789"
      }
    ],
    bankDetails: {
      bankName: "Equity Bank",
      accountName: "Kenyan Avocado Cooperative",
      accountNumber: "9876543210",
      swiftCode: "EQBLKENX"
    },
    createdAt: "2024-03-16T09:00:00Z",
    updatedAt: "2024-03-16T09:00:00Z"
  },
  {
    id: "PO-2024-003",
    status: "Rejected",
    invoiceNumber: "INV-2024-003",
    invoiceDate: "2024-03-17",
    customerPoNumber: "AVT-2023-003",
    exporter: {
      name: "Rift Valley Avocado Farms",
      addressLine1: "789 Export Zone",
      city: "Eldoret",
      country: "Kenya",
      phone: "+254 20 5555555",
      email: "orders@riftvalleyavocados.co.ke",
      registrationNumbers: [
        { type: "HCD License", value: "HCD/2024/789" },
        { type: "VAT", value: "VAT555555555" }
      ]
    },
    importer: {
      name: "Al Wahat Fresh Produce",
      addressLine1: "Building 7, Dubai Food Park",
      city: "Dubai",
      country: "United Arab Emirates",
      postalCode: "12345",
      phone: "+971 4 123 4567",
      email: "imports@alwahat.ae",
      registrationNumbers: [
        { type: "TRN", value: "100123456700003" }
      ]
    },
    shipmentDetails: {
      modeOfTransport: "Air Freight",
      portOfLoading: "JKIA, Kenya",
      portOfDischarge: "DXB, UAE",
      countryOfOrigin: "Kenya",
      countryOfDestination: "United Arab Emirates"
    },
    transactionDetails: {
      incoterms: "CIF Dubai",
      termsOfPayment: "Bank Transfer",
      currency: "USD"
    },
    lineItems: [
      {
        productName: "Fresh Hass Avocados",
        grade: "Grade A",
        sizeSpec: "Count 20",
        packagingType: "4kg Cartons",
        hsCode: "0804.40.00",
        quantity: 3000,
        unitPrice: 11.00,
        totalAmount: 33000.00
      }
    ],
    charges: {
      subtotal: 33000.00,
      freightCharges: 12000.00,
      insuranceCharges: 1200.00,
      packingCharges: 1500.00,
      totalAmount: 47700.00
    },
    shippingMarks: {
      description: "Al Wahat UAE",
      lotId: "LOT-2024-003",
      cartonRange: "1-3000"
    },
    declarations: [
      {
        type: "Origin",
        reference: "Certificate of Origin No. KE-2024-125"
      }
    ],
    bankDetails: {
      bankName: "Standard Chartered",
      accountName: "Rift Valley Avocado Farms",
      accountNumber: "5555555555",
      swiftCode: "SCBLKENX"
    },
    createdAt: "2024-03-17T08:00:00Z",
    updatedAt: "2024-03-17T10:30:00Z"
  }
]; 