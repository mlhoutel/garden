---
title: 'Java'
short: 'general-purpose object-oriented programming language, write once, run anywhere'
topic: language compiled
---

## JavaFx

### First Program

```java
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.control.Button;

/*
Structure: Stage > Scene > Nodes
*/
public class MyApplication extends Application {
	public void start(Stage stage) {
		stage.setTitle("Application Title");
		stage.setScene(createScene(stage));
		stage.show();
	}
	public Scene createScene(Stage stage) {
		BorderPane root = new BorderPane();
		Button button = new Button("Button Label");
		root.setCenter(button);
		return new Scene(root, 200, 100);
	}
	public static void main(String[] args) {
		launch();
	}
}
```

### PAC

### Elements

#### Agencement

```java
import javafx.scene.layout.Hbox;

Hbox root = new Hbox();
root.getChildren().addAll(/* ... */);
```

```java
import javafx.scene.layout.Vbox;

Vbox root = new Vbox();
root.getChildren().addAll(/* ... */);
```

```java
import javafx.scene.layout.FlowPane;

FlowPane root = new FlowPane(Orientation.HORIZONTAL);
root.setRowValignment(VPos.TOP);
root.setColumnHalignment(HPos.CENTER);
root.getChildren().addAll(/* ... */);
```

```java
import javafx.scene.layout.TilePane;

TilePane root = new TilePane(Orientation.HORIZONTAL);
root.getChildren().addAll(/* ... */);
```

```java
import javafx.scene.layout.GridPane;

GridPane root = new GridPane();
root.addRow(0, /* Node, Node,... */);
root.addColumn(3, /* Node, Node,... */);
root.add(/* Node */, 1, 2);
root.add(/* Node */, 4, 0, 1, 2);
```

```java
import javafx.scene.layout.AnchorPane;

AnchorPane root = new AnchorPane();
root.getChildren().addAll(/* ... */);
root.setTopAnchor(/* Node */, 40.0);
root.setRightAnchor(/* Node */, 0.0);
root.setBottomAnchor(/* Node */, 0.0);
root.setLeftAnchor(/* Node */, 0.0);
```

```java
import javafx.scene.layout.StackPane;

StackPane root = new StackPane();
root.getChildren().addAll(/* ... */);
```

```java
import javafx.scene.layout.BorderPane;

BorderPane root = new BorderPane();
root.setTop(/* ... */);
root.setBottom(/* ... */);
root.setLeft(/* ... */);
root.setRight(/* ... */);
root.setCenter(/* ... */);
```

#### Components
