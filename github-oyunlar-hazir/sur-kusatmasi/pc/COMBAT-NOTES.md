# Troops and attack animation update

Seven factions each have 20 selectable cards (140 total). Five new slots per faction:
long-range bow or musket marksman, axe infantry, shield infantry, javelin thrower,
and spear cavalry with a charged first strike. Names and equipment are adapted for
the game's sandbox matchups, rather than an exact historical order of battle.

Decks remain 6–12 cards, preserving both players' controls and two deck pages.
New cards can be selected by removing an existing menu card and selecting its replacement.

Shield infantry takes 20% less direct damage. Axe infantry deals 40% more to targets
with self armor, armor aura or nearby armor support, before defense reductions.
Charge cavalry builds a charge after moving 60 world units; its next unit hit has
50% more damage, then resets. Base damage does not receive the charge bonus.

Attack visuals follow simulation time: preparation in the final 0.25 seconds of
cooldown, strike/release, then recovery. These visuals preserve existing instant
damage timing and do not add delayed or extra damage. Infantry stops its walking
cycle while fighting. Swords and axes swing, spears thrust, bows draw and release,
guns recoil with flash and smoke, throwers extend their arms, and catapult arms move.
Arrows/javelins face their trajectory; bullets travel straight, thrown objects arc.
Pause freezes animation progress; frozen units stop attack poses.

PC/web source is updated independently from the separate Android application.
