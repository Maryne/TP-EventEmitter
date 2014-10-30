// Constructeur
function EventEmitter()
{
    this.callbacks = {};
    return this;
}

// Fonction on
EventEmitter.prototype.on = function(eventName, fonction)
{
    if (!this.callbacks.hasOwnProperty(eventName))
    {
        this.callbacks[eventName] = [];
    }

	// Ajout de la fonction à l'evenement associé
    this.callbacks[eventName].push(fonction);

// Return this pour le chainage
    return this;
};


// Fonction off 
EventEmitter.prototype.off = function(eventName, fonction)
{

    // Si on recoit un evenement en paramètre, et qu'il existe bien dans le tableau
    if (typeof eventName != "undefined" && this.callbacks.hasOwnProperty(eventName))
    {

        // Si on recoit une fonction en paramètre
        if (fonction)
        {
            // Numero correspond à la position de la fonction dans le tableau
            var numero = this.callbacks[eventName].indexOf(fonction);

            // On supprime la fonction associé à l'evenement
            delete this.callbacks[eventName][numero];
        }

        // Si pas de fonction, on supprime tout l'evenement
        else
        {
            delete this.callbacks[eventName];
        }
    }

    // Si pas d'evenement, ou evenement inconnu on vide tout le callbacks
    else
    {
        this.callbacks = {};
    }


    // Return this pour le chainage
    return this;
};

// Fonction emit
EventEmitter.prototype.emit = function(eventName, args)
{

    // Si l'evenement existe dans le tableau
    if (this.callbacks.hasOwnProperty(eventName))
    {

        var funcs = this.callbacks[eventName];

        // Parcours du tableau
        funcs.forEach(function(element, index, tab)
        {

        	// Appel de la fonction
            element.call(null, args);


            if (element.times != undefined)
            {
                element.times--;

                if (element.times == 0)
                {
                    // On supprime la fonction du tableau
                    tab.splice(index, 1);
                }
            }

        });
    }

    // return this pour le chainage
    return this;
};

// Fonction once
// On fait appel à times avec 1 comme paramètre
EventEmitter.prototype.once = function(eventName, fonction)
{
    return this.times(eventName, 1, fonction);
};

// Fonction times
// Stocke une nouvelle fonction dans on, avec un attribut nombre (nombre de fois qu'elle pourra s'executer)
EventEmitter.prototype.times = function(eventName, nombre, fonction)
{
    fonction.times = nombre;

    return this.on(eventName, fonction);
};
