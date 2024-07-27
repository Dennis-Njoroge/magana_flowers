import Box from "@mui/material/Box";
import {Accordion, AccordionDetails, AccordionSummary, Icon} from "@mui/material";

const faqs = [
        {
            "question": "How do I place an order?",
            "answer": "To place an order, browse our selection of flowers and arrangements, add your desired items to the cart, and proceed to checkout. Enter your shipping information, choose a delivery date, and complete the payment process."
        },
        {
            "question": "What payment methods do you accept?",
            "answer": "We currently support Mobile Money (MPESA) payment method. You can select your preferred payment method at checkout."
        },
        // {
        //     "question": "Can I schedule a delivery for a specific date?",
        //     "answer": "Yes, you can schedule a delivery for a specific date during the checkout process. Simply select your preferred delivery date from the available options."
        // },
        {
            "question": "Do you offer same-day delivery?",
            "answer": "Yes, we offer same-day delivery for orders placed before 2 PM local time. Same-day delivery availability may vary based on your location and the delivery address."
        },
        {
            "question": "How can I track my order?",
            "answer": "Once you place your order, you will be notified for any status change of your order via email"
        },
        {
            "question": "What is your return and refund policy?",
            "answer": "If you are not satisfied with your purchase, please contact our customer service team within 24 hours of delivery. We will work with you to resolve the issue, whether it is a replacement, refund, or store credit."
        },
        {
            "question": "How do I care for my flowers?",
            "answer": "Each flower arrangement comes with specific care instructions to help you keep your flowers fresh for as long as possible. Generally, you should trim the stems, change the water daily, and keep the flowers in a cool place away from direct sunlight."
        },
        {
            "question": "Can I customize a flower arrangement?",
            "answer": "Yes, we offer customization options for many of our flower arrangements. Contact our customer service team with your specific requirements, and we will do our best to create a personalized arrangement for you."
        },
        {
            "question": "Do you offer subscriptions for regular flower deliveries?",
            "answer": "Yes, we offer flower subscription services for regular deliveries. You can choose the frequency (weekly, bi-weekly, or monthly) and the type of flowers you prefer. Visit our 'Subscriptions' page for more details."
        },
        {
            "question": "How do I contact customer service?",
            "answer": "You can contact our customer service team via the 'Contact Us' button on My Account Page. We offer support through email and phone. Our customer service hours are Monday to Friday, 9 AM to 6 PM."
        }
    ];


const Faqs = () => {
    return (
        <Box>
            {faqs.map((faq, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<Icon>expand_more</Icon>}
                        aria-controls={`panel-content-${index}`}
                        id={`panel-header-${index}`}
                    >
                        {faq.question}
                    </AccordionSummary>
                    <AccordionDetails>
                        {faq.answer}
                    </AccordionDetails>
                </Accordion>
            ))}

        </Box>
    )
}

export default Faqs;