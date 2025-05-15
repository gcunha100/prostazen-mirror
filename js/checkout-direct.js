document.addEventListener('DOMContentLoaded', function() {
    // Função para redirecionar diretamente para o ClickBank
    function redirectToClickBank(e) {
        e.preventDefault();
        
        // Substitua este link pelo seu link de afiliado do ClickBank
        const clickbankLink = 'https://SEUVENDEDOR.SEUPRODUTO.hop.clickbank.net';
        
        // Redireciona diretamente para o ClickBank
        window.location.href = clickbankLink;
        
        return false;
    }
    
    // Seleciona todos os botões de compra e links de checkout
    const buyButtons = document.querySelectorAll('.buy-button, .checkout-button, a[href*="checkout"], button[data-action="checkout"], [class*="checkout"], [class*="buy-now"], [id*="checkout"], [id*="buy-now"]');
    
    // Adiciona o evento de clique a cada botão
    buyButtons.forEach(button => {
        button.addEventListener('click', redirectToClickBank);
    });
    
    console.log('Checkout direto ativado: ' + buyButtons.length + ' botões modificados');
});
