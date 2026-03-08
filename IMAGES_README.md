# Como Adicionar Imagens aos Lugares

## ✅ Sistema Atual

**Status**: Sistema revertido para imagens locais simples (sem APIs externas).

- ✅ **JSON limpo**: Todos os caminhos de imagem antigos foram removidos
- ✅ **Fallback temporário**: Usa imagens do Unsplash até você adicionar suas próprias
- ✅ **Pronto para uso**: Execute `npm run dev` - funciona imediatamente!

## 📸 Como Adicionar Suas Próprias Imagens

### 1. Preparar as Imagens

Coloque suas imagens na pasta `public/images/`:

```
public/
  images/
    parque_centenario_1.jpg
    parque_centenario_2.jpg
    casa_rosada_1.jpg
    obelisco_1.jpg
```

### 2. Nomeação

Use nomes simples: `{local}_{numero}.jpg`

**Exemplos:**
- `parque_centenario_1.jpg`
- `casa_rosada_1.jpg`
- `obelisco_1.jpg`

### 3. Atualizar o JSON

Edite `public/data/lugares.json` e adicione o array `fotos`:

```json
{
  "nome": "Parque Centenário",
  "fotos": [
    "images/parque_centenario_1.jpg",
    "images/parque_centenario_2.jpg",
    "images/parque_centenario_3.jpg"
  ]
}
```

### 4. Testar

Execute `npm run dev` e veja suas imagens carregando!

## 🎯 Funcionalidades

- **Carousel automático**: Se adicionar múltiplas imagens, o carousel aparece
- **Fallback inteligente**: Se imagem não existir, usa padrão do Unsplash
- **Sem configuração**: Apenas adicione arquivos e atualize JSON

## 📋 Checklist

- [ ] Copiar imagens para `public/images/`
- [ ] Renomear arquivos (ex: `parque_centenario_1.jpg`)
- [ ] Atualizar JSON com caminhos corretos
- [ ] Testar executando `npm run dev`

**🎉 Pronto!** Seu sistema de imagens está funcionando e esperando suas fotos!
