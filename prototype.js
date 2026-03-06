class Scraper {
    constructor(scraperName, opts) {
        this.name = 'Scraper(' + scraperName + ')';
        this[Symbol.toStringTag] = this.name;
        this.options = opts || {};
        this.constructor[Symbol.toStringTag]  = this.name;
    }
    // main runner (function that returns data to save to file)
    setRunner(runner) {
        this.runner = runner;
        return this;
    }

    // git stuff
    /** add git workdir */
    setRepo(directory) {
        this.repo = directory;
        return this;
    }
    /** add differ that should return object with {added, removed} */
    setDiffer(differ) {
        this.differ = differ;
        return this;
    }
    setFile(filePath) {
        this.filePath = filePath;
        return this;
    }

    // comments
    /** add discord webhook that is used when new updates */
    addWebhook(url, messageGenerator) {
        return this;
    }
    /** add comments generator based on diff */
    setComments(comments) {
        this.comments = comments;
        return this;
    }

    // config
    /** enables or disables commits */
    shouldCommit(commits) {
        this.options = { ...this.options, commits };
        return this;
    }
    /** enables or disables git comments */
    shouldComment(comments) {
        this.options = { ...this.options, comments };

        return this;
    }
}

const routes = new Scraper('routes', {
    commits: true,
    comments: true,
})
    .setComments(() => 'new routes!')
    .setRunner(() => ({}))
    .setDiffer((a, b) => {
        const diff = { added: [], removed: [], updated: [] };
        for (let i of Object.keys(a)) {
            // removed
            if (b[i] !== a[i] && b[i] === undefined) {
                diff.removed.push([i, a[i]]);
            }
        }
        for (let i of Object.keys(b)) {
            // added
            if (a[i] !== b[i] && a[i] === undefined) {
                diff.added.push([i, b[i]]);
            }
            // updated
            if (a[i] !== b[i] && a[i] !== undefined) {
                diff.updated.push([i, [a[i], b[i]]]);
            }
        }
        return diff;
    })
    .setFile('routes.json');
console.log(routes);
