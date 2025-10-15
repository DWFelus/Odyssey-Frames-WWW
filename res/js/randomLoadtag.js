document.addEventListener('DOMContentLoaded', function () {
    // Prominence-based groups
    const clientsA = ["Lucky Chops", "Mikromusic", "Song Laboratory","Luxtorpeda", "Spięty", "Obisidian Kingdom", "Illusion", "Tymon Tymański", "Curse of The Undead", "Lipali", "The Materia", "Alegramy Festial", "University of Gdansk", "eM", "V-event", "Closterkeller", "Bollywood Brass Band", "Mayones Guitars"];
    const clientsB = ["Thesis", "Krzta", "Witchrider", "Mechanism", "Moose The Tramp", "Milczenie Owiec", "Sautrus", "The Black Thunder", "Calm Hatchery","Drown My Day", "Łyko"];
    const clientsC = ["Moust", "Odd Stars", "441 Hz", "Mitra", "The Shipyard", "Lowtide", "Lux Perpetua", "Gutter Sirens", "Kozi Syn", "Invicto", "Fractal"];

    // Shuffle utility
    function shuffleArray(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    // Stitch all shuffled groups: A (most important), then B, then C
    const combinedClients = [
        ...shuffleArray(clientsA),
        ...shuffleArray(clientsB),
        ...shuffleArray(clientsC)
    ];

    // Display logic
    function showClientsSequentially(clients, interval = 50, loop = true) {
        const loadtagElement = document.getElementById('loadtag');
        if (!loadtagElement) {
            console.error('Element with ID "loadtag" not found.');
            return;
        }

        let index = 0;

        setInterval(() => {
            loadtagElement.textContent = clients[index];
            index++;

            if (index >= clients.length) {
                if (loop) {
                    index = 0; // loop back to start
                } else {
                    // Optionally clear interval if you don't want looping
                    // clearInterval(intervalId);
                }
            }
        }, interval);
    }

    // Start displaying
    showClientsSequentially(combinedClients, 1000, true); // set `loop` to false if you don't want it to repeat
});
