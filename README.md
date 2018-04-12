# Angular UI Loading Directive for Angular 2 and more

Directive to display a loading state on specific elements of your UI.

## Getting Started

- Download the source
- Add the `ui-loading` directory to your project
- Inject the UILoadingModule in one of your module
- Configure with custom styleClass if needed

### Usage
```html
<!-- In a component, set the uiLoading directive value to the name of an action (observable or subscription) -->
<!-- that has been added by the uiLoadingService -->
<div [uiLoading]="fetchingList1">
  <app-item [ngFor]="item of list1" [model]="item"></app-item>
</div>
<div [uiLoading]="fetchingList2">
  <app-item [ngFor]="item of list2" [model]="item"></app-item>
</div>

<button (click)="fetchHero()">GO</button>
```

TODO - Example in code. (Use observable with delays.)

### Configuration
TODO

### Demo
[TODO Plunker](https://github.com/leye0/AngularUiLoadingDirective)
