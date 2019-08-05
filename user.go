package hex

import "time"

// User instance for holding all the data
type User struct {
	Name       string
	LastUpdate time.Time
	Deck       []Card
}

// Card instance
type Card struct {
	Name   string
	Type   CardType
	Energy uint
	Rarity uint
}

// CardType defines which type is the Card
type CardType uint

const (
	// ATTACK is a reusable card (Unless it has Exhaust) that deals direct damage to an enemy and may have a secondary effect
	ATTACK CardType = iota
	// SKILL is a reusable card (Unless it has Exhaust) that has more unique effects to it. There isn't a clear direction with offensiveness and defensiveness unlike attacks
	SKILL
	// POWER is a permanent upgrade for the entire combat encounter. Some Powers give flat stats like Strength or Dexterity. Others require certain conditions to be met that combat. Each copy of a given power can only be played once per combat
	POWER
	// STATUS is Unplayable cards added to the deck during combat encounters. They are designed to bloat the deck and prevent the player from drawing beneficial cards, with some of them having additional negative effects. Unlike Curses, Status cards are removed from the deck at the end of combat
	STATUS
	// CURSE is Unplayable cards added to the deck during in-game events. Similar to status cards they are designed to bloat the deck and prevent the player from drawing beneficial cards, with some of them having additional negative effects during combat. Unlike Statuses, Curse cards persist in the players' deck until removed by other means
	CURSE
)

// CardRarity is rarity of the card depends on the color of the banner behind its name, regardless of the card's faction
type CardRarity uint

const (
	// COMMON cards have a grey banner
	COMMON CardRarity = iota
	// UNCOMMON cards have a blue banner
	UNCOMMON
	// RARE cards have a gold banner
	RARE
)
