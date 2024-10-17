document.addEventListener("DOMContentLoaded", () => {
    const fromText = document.querySelector(".from-text"),
          toText = document.querySelector(".to-text"),
          selectTag = document.querySelectorAll("select"),
          translateBtn = document.querySelector(".translate-btn");

    selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id === 0 ? (country_code === "uk-UA" ? "selected" : "") : (country_code === "en-GB" ? "selected" : "");
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

    fromText.addEventListener("keyup", () => {
        if (!fromText.value) {
            toText.value = "";
        }
    });

    translateBtn.addEventListener("click", () => {
        let text = fromText.value.trim(),
            translateFrom = selectTag[0].value,
            translateTo = selectTag[1].value;
        if (!text) return;
        toText.setAttribute("placeholder", "Translating...");
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;
        

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.responseData && data.responseData.translatedText) {
                    toText.value = data.responseData.translatedText;
                } else {
                    toText.value = "Translation not available.";
                }
                toText.setAttribute("placeholder", "Translation");
            })
            .catch(error => {
                console.error('Error:', error);
                toText.value = "Error fetching translation.";
            });
    });
});
