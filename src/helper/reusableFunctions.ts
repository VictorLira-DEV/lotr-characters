import CharacterInfo from "../interfaces/characterInfo";

export const capitalizeName = (inputLetter: string) => {
    if (inputLetter.includes(" ")) {
        const inputSlitted = inputLetter.split(" ");
        const inputArray = inputSlitted.filter((input) => input !== "");
        const inputUpper = inputArray.map(
            (n) => n[0].toUpperCase() + n.slice(1).toLowerCase()
        );
        const inputCapitelized = inputUpper.join(" ");
        return inputCapitelized;
    }
    const input = inputLetter.toLowerCase();
    const inputCapitelized = input[0].toUpperCase() + input.slice(1);
    return inputCapitelized;
};

export const removeIncorrectData = (data: CharacterInfo[]) => {
    const newData: CharacterInfo[] = [];
    data.forEach((character: CharacterInfo) => {
        if (character.race !== "NaN" && character.race.length > 2) {
            newData.push(character);
        }
    });

    return newData;
};
