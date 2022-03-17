# P2P SERVER ENGINE

so the idea is for all of the state of the world is derived from a blockchain.

each player pushes changes to the server freely - updating the state of a location/block by adding a new block on the chain

so when entering a location - the blockchain is searched backwards until a matching parcel is found - it will be the latest state.

it may be a collection of blockchains - one for player movement, object location, and parcel ownership may be seprate chains based on different speeds of interaction.


players require a fast blockchain - that's localizable. meaning - once players are in range to see eachother - each other's system watches the blockchain for updates to that player refference.

oct-tree seach... in fact - maybe that's how the ledger should work? a distributed oct-tree? doesn't that need to be rebuilt eachtime? can it just be rebuilt locally?

[player-blockchain](player-blockchain.md)
[object-blockchain](object-blockchain.md)
[ownership-blockchain](ownership-blockchain.md)

