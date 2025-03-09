document.addEventListener("DOMContentLoaded", function () {
    // Garante que o código só será executado após o carregamento completo da página
    const inputCEP = document.getElementById("cep");
    const inputCPF = document.getElementById("inCpf");

    if (inputCEP) {
        inputCEP.addEventListener("input", function () {
            mascaraCEP(this);
        });

        inputCEP.addEventListener("blur", buscarEndereco);
    }

    if (inputCPF) {
        inputCPF.addEventListener("input", function () {
            mascaraCPF(this);
        });
    }
});

function mascaraCEP(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (valor.length > 8) valor = valor.slice(0, 8); // Limita a 8 dígitos

    if (valor.length > 5) {
        input.value = valor.replace(/^(\d{5})(\d{3})$/, '$1-$2'); // Aplica "00000-000"
    } else {
        input.value = valor;
    }
}

function buscarEndereco() {
    var cep = document.getElementById("cep")?.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (cep.length === 8) {
        var url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado!");
                } else {
                    document.getElementById("inLogradouro").value = data.logradouro || "";
                    document.getElementById("inBairro").value = data.bairro || "";
                    document.getElementById("inCidade").value = data.localidade || "";
                    document.getElementById("inEstado").value = data.uf || "";
                }
            })
            .catch(() => {
                alert("Erro ao buscar o CEP. Tente novamente.");
            });
    }
}

function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara no formato 000.000.000-00
    input.value = valor
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
