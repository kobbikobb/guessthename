export const tryParseJson = (jsonString: string | undefined) => {
    if (jsonString === undefined) {
        return undefined;
    }
    try {
        return JSON.parse(jsonString);
    } catch {
        return undefined;
    }
};
