#!/usr/bin/env node

const axios = require('axios');

const query = process.argv.slice(2);

const dictionary = async (word) => {
	try {
		const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en_GB/${word}`;
		const response = await axios.get(baseURL);
		if (!response.data) {
			throw new Error("No word found!");
		}

		console.log('Word:', response.data[0].word)
		response.data[0].meanings.forEach((obj, index) => {
			console.log('--------------------------------------------------------');
			console.log(`[${index + 1}]`)
			console.log('Part Of Speech:', obj.partOfSpeech);
			console.log('Definition:', obj.definitions[0].definition);
			console.log('Synonyms:', obj.definitions[0].synonyms);
			console.log('Example:', obj.definitions[0].example)
			console.log('--------------------------------------------------------');
		})
	} catch (e) {
		console.log(e.message);
	}
}

dictionary(query.join("+" ));