### Known Issue

Due to CSS limitations, particles constantly update the scroll height when inside a scroll area.
Since the scroll area cannot use overflow hidden, the first container inside (e.g. `<ul>`) must apply it.
Or the scroll area should have extra padding to accommodate the particles.