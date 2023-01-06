---
title: "Fluent apis"
short: "Design pattern used in software development to create an interface for configuring an object in a clear and concise way, often using a chain of method calls to build up a complex configuration."
topic: computer-science fluent-api java
---

## Api use

**Main**

```java
package windows;

public final class Main {

	public static void main(String[] args) {
		
		FrameBuilder frameBuilder = new FrameBuilder("A");
		
		Frame frame = frameBuilder
			.title("Frame A")
			.size(200, 100)
			.section("content")
				.section("header")
					.label("Hello")
					.end()
				.end()
			.section("body")
				.button("World!")
				.end()
			.collect();

		String generated = frame.execute();

		System.out.println("Output generated code:");
		System.out.println(generated);		
	}
}
```

## Builders

**Frame builder**

```java
package windows;

import java.util.ArrayList;

public class FrameBuilder {

	public String name = "";
	public ArrayList<SectionBuilder<FrameBuilder>> sections = new ArrayList<SectionBuilder<FrameBuilder>>();

	public String title = "";
	public int width = 0;
	public int height = 0;
	
	public FrameBuilder(String name) {
		this.name = name;
	}
	
	public FrameBuilder title(String title) {
		this.title = title;
		return this;
	}
	
	public FrameBuilder size(int width, int height) {
		this.width = width;
		this.height = height;
		
		return this;
	}
	
	public SectionBuilder<FrameBuilder> section(String label) {
		SectionBuilder<FrameBuilder> sectionBuilder = new SectionBuilder<FrameBuilder>(label, this);
		
		this.sections.add(sectionBuilder);
		
		return sectionBuilder;
	}

	public Frame collect() {
		Frame f = new Frame(this.name, this.title, this.width, this.height);
		
		for (SectionBuilder<FrameBuilder> s : this.sections) {
			f.addSection(s.collect(this.name));
		}
		
		return f;
	}
	
}
```

**Section builder**

```java
package windows;

import java.util.ArrayList;

/**
 * @param <T> Pile of types
 *  - FrameBuilder for root
 *  - SectionBuilder<...> for sub levels
 *  
 *  T = parent object
 *  SectionBuilder<T> = current type
 *  SectionBuilder<SectionBuilder<T>> = sub sections type
 */
public class SectionBuilder<T> {

	public String name = "";
	public T parent = null;
	public ArrayList<SectionBuilder<SectionBuilder<T>>> sections = new ArrayList<SectionBuilder<SectionBuilder<T>>>();

	public String label;
	public String button;
	
	public SectionBuilder(String name, T parent) {
		this.name = name;
		this.parent = parent;
	}
	
	public SectionBuilder<T> label(String label) {
		this.label = label;
		return this;
	}
	
	public SectionBuilder<T> button(String button) {
		this.button = button;
		return this;
	}

	public SectionBuilder<SectionBuilder<T>> section(String label) {
		SectionBuilder<SectionBuilder<T>> sectionBuilder = new SectionBuilder<SectionBuilder<T>>(label, this);
		
		this.sections.add(sectionBuilder);
		
		return sectionBuilder;
	}
	
	public T end() {
		return this.parent;
	}
	
	public Section collect(String parentName) {
		Section f = new Section(this.label, this.button, parentName);
		
		for (SectionBuilder<SectionBuilder<T>> s : this.sections) {
			f.addSection(s.collect(parentName));
		}
		
		return f;
	}
}
```

## Generators objects

**Frame**

```java
package windows;

import java.util.ArrayList;

public class Frame {
	public String name = "";
	public String title = "";
	public int width = 0;
	public int height = 0;

	public ArrayList<Section> sections = new ArrayList<Section>();
	
	public Frame(String name, String title, int width, int height) {
		this.name = name;
		this.title = title;
		this.width = width;
		this.height = height;
	}
	
	public void addSection(Section s) {
		this.sections.add(s);
	}

	public String execute() {
		String program = "import javax.swing.JFrame;\r\n"
				+ "import javax.swing.JLabel;\r\n"
				+ "import javax.swing.JButton;\r\n"
				+ "import javax.swing.SwingUtilities;\r\n"
				+ "import java.awt.FlowLayout;\r\n"
				+ "public class FrameApplication {\r\n"
				+ "public static void main(String[] args) {\r\n"
				+ "SwingUtilities.invokeLater(new Runnable() {\r\n"
				+ "public void run() {\r\n";
		
		program += "JFrame " + this.name + " = new JFrame()\r\n";
		program += this.name + ".setLayout(new FlowLayout());\r\n";
		program += this.name + ".setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);\r\n";
		program += this.name + ".setTitle(" + this.title + ");\r\n";
		program += this.name + ".setSize(" + this.width + ", " + this.height + ");\r\n";
		
		for (Section s : this.sections) {
			program += s.execute();
		}
		
		program += this.name + ".setVisible(true);\r\n"
				+ "}\r\n"
				+ "});\r\n"
				+ "}\r\n"
				+ "}";
		
		return program;
		
	}
}
```

**Section**

```java
package windows;

import java.util.ArrayList;

public class Section {
	public static int sectionId = -1;
	
	public String id; 
	public String label;
	public String button;
	public String parentName;
	
	public ArrayList<Section> sections = new ArrayList<Section>();
	
	public Section(String label, String button, String parentName) {
		this.id = Integer.toString(sectionId++);
		this.parentName = parentName;
		this.label = label;
		this.button = button;
	}

	public void addSection(Section s) {
		this.sections.add(s);
	}

	public String execute() {
		String program = "";
		
		if (this.label != null) {
			String labelName = "label" + this.parentName + this.id;
	
			program += "JLabel " + labelName + " = new JLabel();\r\n"
			 + this.parentName + ".add(" + labelName + ");\r\n"
			+ labelName + ".setText(\"" + this.label + "\");\r\n";
		}

		if (this.button != null) {
			String buttonName = "button" + this.parentName + this.id;
	
			program += "JButton " + buttonName + " = new JButton();\r\n"
			 + this.parentName + ".add(" + buttonName + ");\r\n"
			+ buttonName + ".setText(\"" + this.button + "\");\r\n";
		}
		
		for (Section s : this.sections) {
			program += s.execute();
		}
		
		return program;
	}
}
```
