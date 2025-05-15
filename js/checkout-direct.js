document.addEventListener('DOMContentLoaded', function() {
    // Seus links de afiliado do ClickBank para diferentes opções
    const clickbankLinks = {
        '2bottles': "https://prostazen.pay.clickbank.net/?cbitems=PTZ2FE&cbfid=57786&template=prostaz2&pg=upsell&hopId=30e3fa5c-4909-4f39-a865-080a83ef0cab&vq=01.41DA77AECCA473E8FD0A268D2C86E67F6BF8F53AFF600ACA9BFD6CEB2FA712A5168497C6B9D82A797FEABAAA0E7221EA71C29165&aff_sub2=v3_a72e0f57-9b6f-4f9b-9c63-940720996fdb_67ca2c14a6c0c2fc4d35c3ab_150_t-12_s-1",
        '3bottles': "https://prostazen.pay.clickbank.net/?cbitems=PTZ3FE&cbfid=57786&template=prostaz3&pg=upsell&hopId=30e3fa5c-4909-4f39-a865-080a83ef0cab&vq=01.41DA77AECCA473E8FD0A268D2C86E67F6BF8F53AFF600ACA9BFD6CEB2FA712A5168497C6B9D82A797FEABAAA0E7221EA71C29165&aff_sub2=v3_a72e0f57-9b6f-4f9b-9c63-940720996fdb_67ca2c14a6c0c2fc4d35c3ab_150_t-12_s-1",
        '6bottles': "https://prostazen.pay.clickbank.net/?cbitems=PTZ6FE&cbfid=57786&template=prostaz6&pg=upsell&hopId=30e3fa5c-4909-4f39-a865-080a83ef0cab&vq=01.41DA77AECCA473E8FD0A268D2C86E67F6BF8F53AFF600ACA9BFD6CEB2FA712A5168497C6B9D82A797FEABAAA0E7221EA71C29165&aff_sub2=v3_a72e0f57-9b6f-4f9b-9c63-940720996fdb_67ca2c14a6c0c2fc4d35c3ab_150_t-12_s-1"
    };
    
    // Link padrão caso não consiga identificar qual botão foi clicado
    const defaultLink = clickbankLinks['3bottles']; // Opção de 3 frascos como padrão
    
    // Função para determinar qual link usar baseado no elemento clicado
    function getClickbankLink(element) {
        const elementHTML = (element.outerHTML || '').toLowerCase();
        const elementText = (element.innerText || '').toLowerCase();
        const parentHTML = element.parentElement ? (element.parentElement.outerHTML || '').toLowerCase() : '';
        
        // Combina os textos para busca
        const searchText = elementHTML + ' ' + elementText + ' ' + parentHTML;
        
        // Verifica se o elemento contém indicação de quantidade
        if (searchText.includes('2 frasco') || searchText.includes('2 pote') || 
            searchText.includes('dois frasco') || searchText.includes('dois pote') || 
            searchText.includes('2bottles') || searchText.includes('2 bottles')) {
            console.log('Detectado botão de 2 frascos');
            return clickbankLinks['2bottles'];
        }
        
        if (searchText.includes('3 frasco') || searchText.includes('3 pote') || 
            searchText.includes('três frasco') || searchText.includes('três pote') || 
            searchText.includes('3bottles') || searchText.includes('3 bottles')) {
            console.log('Detectado botão de 3 frascos');
            return clickbankLinks['3bottles'];
        }
        
        if (searchText.includes('6 frasco') || searchText.includes('6 pote') || 
            searchText.includes('seis frasco') || searchText.includes('seis pote') || 
            searchText.includes('6bottles') || searchText.includes('6 bottles')) {
            console.log('Detectado botão de 6 frascos');
            return clickbankLinks['6bottles'];
        }
        
        // Se não conseguir identificar, retorna o link padrão
        console.log('Não foi possível identificar a quantidade, usando link padrão');
        return defaultLink;
    }
    
    // Função para verificar se o elemento clicado é um botão de compra
    function isBuyButton(element) {
        if (!element) return false;
        
        // Verifica texto do elemento
        const text = (element.innerText || '').toLowerCase();
        const buyTexts = ['comprar', 'compre', 'checkout', 'pagamento', 'pagar', 'buy', 'purchase', 'order', 'quero', 'adquirir'];
        
        // Verifica classes, IDs e atributos
        const elementString = (element.outerHTML || '').toLowerCase();
        const buyPatterns = ['buy', 'checkout', 'payment', 'compra', 'pagar', 'hop.clickbank', 'btn', 'button'];
        
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
                
                // Determina qual link usar
                const link = getClickbankLink(target);
                console.log('Redirecionando para:', link);
                
                // Redireciona para o ClickBank
                window.location.href = link;
                return false;
            }
            
            // Move para o elemento pai
            target = target.parentElement;
        }
    }, true);
    
    console.log('Sistema de redirecionamento de checkout ativado com múltiplos links');
    
    // Também substitui qualquer função global hop
    window.hop = function(e) {
        console.log('Função hop interceptada');
        // Tenta identificar qual botão acionou a função hop
        const link = e && e.target ? getClickbankLink(e.target) : defaultLink;
        window.location.href = link;
        return false;
    };
});
