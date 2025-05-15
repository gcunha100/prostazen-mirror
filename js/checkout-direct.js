document.addEventListener('DOMContentLoaded', function() {
    // Seu link de afiliado do ClickBank
    const clickbankLink = 'https://SEUVENDEDOR.SEUPRODUTO.hop.clickbank.net';
    
    // Função para verificar se o elemento clicado é um botão de compra
    function isBuyButton(element) {
        // Verifica texto do elemento
        const text = element.innerText && element.innerText.toLowerCase();
        const buyTexts = ['comprar', 'compre', 'checkout', 'pagamento', 'pagar', 'buy', 'purchase', 'order'];
        
        // Verifica classes, IDs e atributos
        const elementString = element.outerHTML.toLowerCase();
        const buyPatterns = ['buy', 'checkout', 'payment', 'compra', 'pagar', 'hop.clickbank'];
        
        // Verifica se o texto contém palavras relacionadas à compra
        if (text && buyTexts.some(t => text.includes(t))) {
            return true;
        }
        
        // Verifica se o HTML contém padrões relacionados à compra
        if (buyPatterns.some(p => elementString.includes(p))) {
            return true;
        }
        
        return false;
    }
    
    // Intercepta todos os cliques na página
    document.addEventListener('click', function(e) {
        let target = e.target;
        
        // Verifica até 5 níveis acima do elemento clicado
        for (let i = 0; i < 5; i++) {
            if (!target) break;
            
            if (isBuyButton(target)) {
                console.log('Botão de compra detectado:', target);
                e.preventDefault();
                e.stopPropagation();
                
                // Redireciona para o ClickBank
                window.location.href = clickbankLink;
                return false;
            }
            
            // Move para o elemento pai
            target = target.parentElement;
        }
    }, true);
    
    console.log('Sistema de redirecionamento de checkout ativado');
    
    // Também substitui qualquer função global hop
    window.hop = function() {
        console.log('Função hop interceptada');
        window.location.href = clickbankLink;
        return false;
    };
});
